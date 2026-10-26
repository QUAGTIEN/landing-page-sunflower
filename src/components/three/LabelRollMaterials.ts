import * as THREE from "three";

/** Original procedural textures: no downloaded HDRs, customer artwork or fonts. */
function canvas(width: number, height = width) {
  const image = document.createElement("canvas");
  image.width = width;
  image.height = height;
  const ctx = image.getContext("2d");
  if (!ctx) throw new Error("Studio textures are unavailable");
  return { image, ctx };
}

function random(seed: number) {
  return () => {
    seed = (Math.imul(1664525, seed) + 1013904223) | 0;
    return (seed >>> 0) / 4294967296;
  };
}

function texture(image: HTMLCanvasElement, color = true) {
  const map = new THREE.CanvasTexture(image);
  map.colorSpace = color ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  map.anisotropy = 4;
  return map;
}

export function createStudioMaterials() {
  const rng = random(31803);
  const grain = canvas(256);
  grain.ctx.fillStyle = "#b8b8b8";
  grain.ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 18000; i++) {
    const light = 130 + Math.floor(rng() * 95);
    grain.ctx.fillStyle = `rgb(${light},${light},${light})`;
    grain.ctx.fillRect(rng() * 256, rng() * 256, 1, 1);
  }
  const paperGrain = texture(grain.image, false);
  paperGrain.wrapS = paperGrain.wrapT = THREE.RepeatWrapping;

  const kraft = canvas(512);
  kraft.ctx.fillStyle = "#b49776";
  kraft.ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 15000; i++) {
    const light = rng() > 0.5;
    kraft.ctx.strokeStyle = light ? "rgba(245,225,190,.11)" : "rgba(73,49,27,.09)";
    const x = rng() * 512, y = rng() * 512;
    kraft.ctx.beginPath();
    kraft.ctx.moveTo(x, y);
    kraft.ctx.lineTo(x + rng() * 5, y + rng() * 2);
    kraft.ctx.stroke();
  }
  kraft.ctx.strokeStyle = "rgba(83,60,35,.12)";
  kraft.ctx.lineWidth = 1;
  for (let y = -512; y < 768; y += 170) {
    kraft.ctx.beginPath();
    kraft.ctx.moveTo(0, y);
    kraft.ctx.lineTo(512, y + 180);
    kraft.ctx.stroke();
  }
  const kraftMap = texture(kraft.image);

  const rings = canvas(1024);
  rings.ctx.fillStyle = "#f3f0e9";
  rings.ctx.fillRect(0, 0, 1024, 1024);
  for (let r = 208; r < 512; r += 0.95) {
    rings.ctx.strokeStyle = `rgba(150,139,120,${0.23 + rng() * 0.18})`;
    rings.ctx.lineWidth = 0.45 + rng() * 0.35;
    rings.ctx.beginPath();
    rings.ctx.arc(512, 512, r, 0, Math.PI * 2);
    rings.ctx.stroke();
  }
  const woundMap = texture(rings.image);

  const outer = canvas(1024, 256);
  outer.ctx.fillStyle = "#ddd4c4";
  outer.ctx.fillRect(0, 0, 1024, 256);
  for (let i = 0; i < 12; i++) {
    outer.ctx.fillStyle = "#faf9f5";
    outer.ctx.strokeStyle = "#d6cdbf";
    outer.ctx.lineWidth = 1;
    outer.ctx.beginPath();
    outer.ctx.roundRect(i * 1024 / 12 + 3, 9, 1024 / 12 - 6, 238, 5);
    outer.ctx.fill();
    outer.ctx.stroke();
  }
  const labelMap = texture(outer.image);

  const fabric = canvas(256);
  fabric.ctx.fillStyle = "#c9c7c0";
  fabric.ctx.fillRect(0, 0, 256, 256);
  fabric.ctx.lineWidth = 0.5;
  for (let i = 0; i < 256; i += 2) {
    fabric.ctx.strokeStyle = i % 4 === 0 ? "#f8f5e9" : "#b4b0a6";
    fabric.ctx.beginPath();
    fabric.ctx.moveTo(i, 0);
    fabric.ctx.lineTo(i + 3, 256);
    fabric.ctx.stroke();
  }
  const fabricMap = texture(fabric.image, false);

  const shadow = canvas(256);
  const radial = shadow.ctx.createRadialGradient(128, 128, 0, 128, 128, 125);
  radial.addColorStop(0, "rgba(57,43,25,.34)");
  radial.addColorStop(0.3, "rgba(57,43,25,.17)");
  radial.addColorStop(1, "rgba(57,43,25,0)");
  shadow.ctx.fillStyle = radial;
  shadow.ctx.fillRect(0, 0, 256, 256);
  const shadowMap = texture(shadow.image);

  const wall = canvas(1024, 512);
  wall.ctx.fillStyle = "#eee8df";
  wall.ctx.fillRect(0, 0, 1024, 512);
  wall.ctx.save();
  wall.ctx.translate(520, 256);
  wall.ctx.rotate(-0.28);
  wall.ctx.filter = "blur(24px)";
  for (let x = -600; x < 600; x += 185) {
    wall.ctx.fillStyle = "rgba(255,252,244,.42)";
    wall.ctx.fillRect(x, -600, 100, 1200);
  }
  wall.ctx.restore();
  const wallMap = texture(wall.image);
  wallMap.wrapS = wallMap.wrapT = THREE.RepeatWrapping;

  const paper = new THREE.MeshStandardMaterial({
    color: "#faf8f2", roughness: 0.47, bumpMap: paperGrain, bumpScale: 0.003,
    side: THREE.DoubleSide,
  });
  const edge = new THREE.MeshStandardMaterial({
    color: "#fffdf7", map: woundMap, bumpMap: woundMap, bumpScale: 0.013,
    roughness: 0.56, side: THREE.DoubleSide,
  });
  const barrel = new THREE.MeshStandardMaterial({
    color: "#ffffff", map: labelMap, bumpMap: labelMap, bumpScale: 0.005,
    roughness: 0.42,
  });
  const core = new THREE.MeshStandardMaterial({
    map: kraftMap, bumpMap: paperGrain, bumpScale: 0.008, roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const liner = new THREE.MeshStandardMaterial({
    color: "#cdbd9e", roughness: 0.65, bumpMap: paperGrain, bumpScale: 0.002,
    side: THREE.DoubleSide,
  });
  const silicone = new THREE.MeshPhysicalMaterial({
    color: "#f0ebe0", roughness: 0.24, transparent: true, opacity: 0.65,
    side: THREE.DoubleSide, depthWrite: false,
  });
  const adhesive = new THREE.MeshPhysicalMaterial({
    color: "#cdb88f", roughness: 0.18, transparent: true, opacity: 0.45,
    side: THREE.DoubleSide, depthWrite: false, clearcoat: 0.2,
  });
  const satin = new THREE.MeshPhysicalMaterial({
    color: "#eae3d5", roughness: 0.32, sheen: 0.7, sheenColor: new THREE.Color("#fffaf0"),
    sheenRoughness: 0.5, bumpMap: fabricMap, bumpScale: 0.006, side: THREE.DoubleSide,
  });
  const champagne = new THREE.MeshStandardMaterial({
    color: "#c8b58f", roughness: 0.24, metalness: 0.78, envMapIntensity: 2,
  });
  const materials = { paper, edge, barrel, core, liner, silicone, adhesive, satin, champagne };
  const textures = { paperGrain, kraftMap, woundMap, labelMap, fabricMap, shadowMap, wallMap };
  return { ...materials, textures, dispose: () => {
    Object.values(materials).forEach((material) => material.dispose());
    Object.values(textures).forEach((map) => map.dispose());
  } };
}

export type StudioMaterials = ReturnType<typeof createStudioMaterials>;
