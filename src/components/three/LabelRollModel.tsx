import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import type { StudioMaterials } from "./LabelRollMaterials";
import type { TimelineChannels } from "./labelRollTimeline";

const RADIUS = 1.04;
const WIDTH = 0.82;
const CORE = 0.425;

export function createLabelRollRig(materials: StudioMaterials, mobile: boolean) {
  const rootGroup = new THREE.Group();
  const rollPose = new THREE.Group();
  rollPose.position.y = -0.07;
  const rollAssembly = new THREE.Group();
  const propsGroup = new THREE.Group();
  rootGroup.add(rollPose, propsGroup);
  rollPose.add(rollAssembly);
  const geometries = new Set<THREE.BufferGeometry>();
  const extraMaterials: THREE.Material[] = [];
  const own = <T extends THREE.BufferGeometry>(geometry: T): T => {
    geometries.add(geometry);
    return geometry;
  };
  const mesh = (geometry: THREE.BufferGeometry, material: THREE.Material, parent = rollAssembly) => {
    const object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
    object.receiveShadow = true;
    object.layers.enable(1);
    parent.add(object);
    return object;
  };

  // Real hollow tube, with continuous inside, outside and cut ends.
  const profile = [
    new THREE.Vector2(0.365, -WIDTH / 2 - 0.012),
    new THREE.Vector2(0.365, WIDTH / 2 + 0.012),
    new THREE.Vector2(CORE, WIDTH / 2 + 0.012),
    new THREE.Vector2(CORE, -WIDTH / 2 - 0.012),
    new THREE.Vector2(0.365, -WIDTH / 2 - 0.012),
  ];
  const core = own(new THREE.LatheGeometry(profile, mobile ? 72 : 128));
  core.rotateX(Math.PI / 2);
  mesh(core, materials.core);

  const sides = own(new THREE.RingGeometry(CORE, RADIUS, mobile ? 96 : 160, 1));
  const front = mesh(sides, materials.edge);
  front.position.z = WIDTH / 2;
  const back = mesh(sides, materials.edge);
  back.position.z = -WIDTH / 2;
  back.rotation.y = Math.PI;
  const barrel = own(new THREE.CylinderGeometry(RADIUS, RADIUS, WIDTH, mobile ? 96 : 160, 1, true));
  barrel.rotateX(Math.PI / 2);
  mesh(barrel, materials.barrel);

  // Curved thin surfaces, all anchored at the same tangent on the cylinder.
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.025, 0.18, 0),
    new THREE.Vector3(-1.08, -0.32, 0.025),
    new THREE.Vector3(-1.14, -0.86, 0.22),
    new THREE.Vector3(-1.40, -1.035, 0.55),
    new THREE.Vector3(-1.78, -1.035, 0.85),
  ], false, "catmullrom", 0.4);
  const stripGroup = new THREE.Group();
  stripGroup.name = "label-strip";
  rollPose.add(stripGroup);
  type Surface = {
    object: THREE.Mesh;
    geometry: THREE.BufferGeometry; start: number; end: number;
    width: number; layer: number; segments: number; label: boolean; peel: boolean;
  };
  const surfaces: Surface[] = [];
  const addSurface = (
    material: THREE.Material, layer: number, width: number,
    start = 0, end = 1, label = false, peel = false,
  ) => {
    const segments = label ? 18 : (mobile ? 48 : 80);
    const geometry = own(new THREE.BufferGeometry());
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array((segments + 1) * 6), 3).setUsage(THREE.DynamicDrawUsage));
    const uv = new Float32Array((segments + 1) * 4);
    const indices: number[] = [];
    for (let i = 0; i <= segments; i++) {
      uv.set([i / segments, 0, i / segments, 1], i * 4);
      if (i < segments) {
        const a = i * 2;
        indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
      }
    }
    geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    geometry.setIndex(indices);
    const object = mesh(geometry, material, stripGroup);
    object.frustumCulled = false;
    object.renderOrder = layer;
    surfaces.push({ object, geometry, start, end, width, layer, segments, label, peel });
  };
  addSurface(materials.liner, 0, WIDTH);
  addSurface(materials.silicone, 1, WIDTH - 0.018);
  addSurface(materials.adhesive, 2, WIDTH - 0.024);
  for (let i = 0; i < 5; i++) {
    addSurface(materials.paper, 3, WIDTH - 0.07, 0.022 + i * 0.195, 0.197 + i * 0.195, true, i === 3);
  }

  const point = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  const across = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const vertex = new THREE.Vector3();
  let lastExtend = -1, lastSeparate = -1, lastPeel = -1;
  const update = (state: TimelineChannels) => {
    if (Math.abs(state.stripExtend - lastExtend) + Math.abs(state.layerSeparation - lastSeparate) + Math.abs(state.peelLift - lastPeel) < 0.0002) return;
    lastExtend = state.stripExtend;
    lastSeparate = state.layerSeparation;
    lastPeel = state.peelLift;
    curve.points[3].x = -1.4 - state.stripExtend * 0.15;
    curve.points[4].x = -1.78 - state.stripExtend * 0.40;
    curve.points[4].z = 0.85 + state.stripExtend * 0.24;
    const separation = [0, 0.16, 0.34, 0.66];
    for (const surface of surfaces) {
      // Interior films are only visible when separated; avoid coplanar transparent interfaces at rest.
      surface.object.visible = surface.layer === 0 || surface.layer === 3 || state.layerSeparation > 0.015;
      const positions = surface.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i <= surface.segments; i++) {
        const s = i / surface.segments;
        const u = THREE.MathUtils.lerp(surface.start, surface.end, s);
        curve.getPoint(u, point);
        curve.getTangent(u, tangent).normalize();
        // Keep the roll's width axis parallel through the bend: an orthogonal
        // Frenet frame would twist this wide sheet into itself at the tight curl.
        across.set(0, 0, 1);
        normal.crossVectors(tangent, across).normalize();
        const hinge = Math.sin(Math.min(1, u / 0.85) * Math.PI / 2);
        let lift = surface.layer * 0.0033 + state.layerSeparation * separation[surface.layer] * hinge;
        if (surface.peel) lift += state.peelLift * Math.sin(s * Math.PI / 2) * 0.14;
        let halfWidth = surface.width / 2;
        if (surface.label) {
          const distance = Math.min(s, 1 - s) * 0.55;
          const corner = 0.035;
          if (distance < corner) halfWidth -= corner - Math.sqrt(Math.max(0, corner * corner - Math.pow(corner - distance, 2)));
        }
        for (let edge = 0; edge < 2; edge++) {
          vertex.copy(point).addScaledVector(normal, lift).addScaledVector(across, (edge ? 1 : -1) * halfWidth);
          // The release liner stays above the floor; thin layers must never intersect the cyclorama.
          vertex.y = Math.max(vertex.y, -1.00 + lift * Math.max(0.2, normal.y));
          positions.setXYZ(i * 2 + edge, vertex.x, vertex.y, vertex.z);
        }
      }
      positions.needsUpdate = true;
      surface.geometry.computeVertexNormals();
    }
  };

  // A low folding carton: subordinate scale, subtle folds, no customer artwork.
  const boxGeometry = own(new RoundedBoxGeometry(1.18, 0.58, 0.86, 3, 0.015));
  const carton = mesh(boxGeometry, materials.paper, propsGroup);
  carton.position.set(1.10, -0.83, -0.40);
  carton.rotation.y = -0.16;
  const lineMaterial = new THREE.LineBasicMaterial({ color: "#c5bcab", transparent: true, opacity: 0.45 });
  extraMaterials.push(lineMaterial);
  carton.add(new THREE.LineSegments(own(new THREE.EdgesGeometry(boxGeometry, 40)), lineMaterial));
  const folds = own(new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-0.54, 0.292, -0.37), new THREE.Vector3(0.54, 0.292, -0.37),
    new THREE.Vector3(0.54, 0.292, -0.37), new THREE.Vector3(0.54, 0.292, 0.37),
    new THREE.Vector3(0.54, 0.292, 0.37), new THREE.Vector3(-0.54, 0.292, 0.37),
    new THREE.Vector3(-0.54, 0.292, 0.37), new THREE.Vector3(-0.54, 0.292, -0.37),
    new THREE.Vector3(-0.59, 0.18, 0.432), new THREE.Vector3(0.59, 0.18, 0.432),
  ]));
  carton.add(new THREE.LineSegments(folds, lineMaterial));

  // Die-cut art-paper tags, including actual punched holes.
  const tagShape = new THREE.Shape();
  tagShape.moveTo(-0.19, -0.30);
  tagShape.lineTo(0.19, -0.30);
  tagShape.lineTo(0.19, 0.20);
  tagShape.lineTo(0.10, 0.30);
  tagShape.lineTo(-0.10, 0.30);
  tagShape.lineTo(-0.19, 0.20);
  tagShape.closePath();
  const tagHole = new THREE.Path();
  tagHole.absarc(0, 0.21, 0.022, 0, Math.PI * 2, true);
  tagShape.holes.push(tagHole);
  const tagGeometry = own(new THREE.ExtrudeGeometry(tagShape, {
    depth: 0.008, bevelEnabled: true, bevelSize: 0.002, bevelThickness: 0.002,
    bevelSegments: 1, curveSegments: 16, steps: 1,
  }));
  const tag1 = mesh(tagGeometry, materials.paper, propsGroup);
  tag1.rotation.set(-Math.PI / 2, 0, -0.35);
  tag1.position.set(1.03, -1.105, 0.90);
  const tag2 = mesh(tagGeometry, materials.paper, propsGroup);
  tag2.rotation.set(-Math.PI / 2, 0, 0.02);
  tag2.position.set(1.15, -1.092, 0.83);
  const cord = new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.14, -1.02, 0.62),
    new THREE.Vector3(1.25, -0.88, 0.48),
    new THREE.Vector3(1.45, -0.98, 0.47),
    new THREE.Vector3(1.56, -1.04, 0.72),
  ]);
  const cordMaterial = new THREE.MeshStandardMaterial({ color: "#a89980", roughness: 0.88 });
  extraMaterials.push(cordMaterial);
  const cordMesh = mesh(own(new THREE.TubeGeometry(cord, 32, 0.006, 5, false)), cordMaterial, propsGroup);

  // A short folded satin garment label, with woven-edge relief.
  const satinGeometry = own(new THREE.PlaneGeometry(0.60, 0.27, 40, 8));
  const satinPositions = satinGeometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < satinPositions.count; i++) {
    const x = satinPositions.getX(i);
    const z = satinPositions.getY(i);
    const t = (x + 0.3) / 0.6;
    satinPositions.setXYZ(i, x, Math.sin(t * Math.PI) * 0.085 + Math.pow(Math.abs(z) / 0.135, 12) * 0.006, z);
  }
  satinGeometry.computeVertexNormals();
  const satin = mesh(satinGeometry, materials.satin, propsGroup);
  satin.position.set(1.19, -1.105, 1.36);
  satin.rotation.y = -0.15;

  const sphereGeometry = own(new THREE.SphereGeometry(0.13, mobile ? 24 : 40, mobile ? 16 : 28));
  const orb1 = mesh(sphereGeometry, materials.champagne, propsGroup);
  orb1.position.set(0.44, -0.98, 1.10);
  const orb2 = mesh(sphereGeometry, materials.champagne, propsGroup);
  orb2.position.set(1.30, 0.72, -0.75);
  orb2.scale.setScalar(0.85);

  // Soft local contact, supporting the real directional shadows.
  const shadowMaterial = new THREE.MeshBasicMaterial({
    map: materials.textures.shadowMap, transparent: true, depthWrite: false, opacity: 0.8,
  });
  extraMaterials.push(shadowMaterial);
  const shadow = mesh(own(new THREE.PlaneGeometry(3.7, 2.3)), shadowMaterial, rootGroup);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(0.18, -1.09, 0.20);
  shadow.castShadow = false;
  shadow.receiveShadow = false;
  shadow.layers.disable(1);

  if (mobile) {
    carton.scale.setScalar(0.65);
    carton.position.set(0.56, -0.9315, -0.5);
    tag1.position.x = 0.55;
    tag2.position.x = 0.65;
    satin.position.x = 0.70;
    cordMesh.position.x = -0.50;
    orb2.position.x = 0.90;
    propsGroup.position.x = -0.12;
  }

  return {
    rootGroup, rollPose, rollAssembly, propsGroup, update,
    dispose: () => {
      geometries.forEach((geometry) => geometry.dispose());
      extraMaterials.forEach((material) => material.dispose());
    },
  };
}

export type LabelRollRig = ReturnType<typeof createLabelRollRig>;
