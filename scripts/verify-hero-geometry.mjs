import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";
import * as THREE from "three";

const asModule = (source) => "data:text/javascript;base64," + Buffer.from(source).toString("base64");
const compile = (file) => ts.transpileModule(readFileSync(resolve(file), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { computeTimelineState } = await import(asModule(compile("src/components/three/labelRollTimeline.ts")));
const modelSource = compile("src/components/three/LabelRollModel.tsx")
  .replace('from "three"', `from "${pathToFileURL(resolve("node_modules/three/build/three.module.js")).href}"`)
  .replace('from "three/examples/jsm/geometries/RoundedBoxGeometry.js"', `from "${pathToFileURL(resolve("node_modules/three/examples/jsm/geometries/RoundedBoxGeometry.js")).href}"`);
const { createLabelRollRig } = await import(asModule(modelSource));

assert.equal(computeTimelineState(0).layerSeparation, 0);
assert.equal(computeTimelineState(0.65).layerSeparation, 1);
assert.equal(computeTimelineState(1).layerSeparation, 0);
assert.equal(computeTimelineState(1).peelLift, 0);
for (let i = -10; i <= 110; i++) {
  for (const value of Object.values(computeTimelineState(i / 100))) assert.ok(value >= 0 && value <= 1);
}

for (const mobile of [false, true]) {
  const material = new THREE.MeshStandardMaterial();
  const fakeMaterials = Object.fromEntries(["core", "edge", "barrel", "liner", "silicone", "adhesive", "paper", "satin", "champagne"].map((name) => [name, material]));
  fakeMaterials.textures = { shadowMap: new THREE.Texture() };
  const rig = createLabelRollRig(fakeMaterials, mobile);
  const scale = mobile ? 0.68 : 1;
  rig.rootGroup.scale.setScalar(scale);
  const allocated = new Set();
  rig.rootGroup.traverse((object) => { if (object.geometry) allocated.add(object.geometry); });
  let disposed = 0;
  allocated.forEach((geometry) => geometry.addEventListener("dispose", () => disposed++));
  let samples = 0;
  // Forward and reverse scroll exercise every curved surface, including the peel hinge.
  for (const direction of [1, -1]) {
    for (let step = 0; step <= 100; step++) {
      const channels = computeTimelineState((direction === 1 ? step : 100 - step) / 100);
      rig.update(channels);
      rig.rollPose.rotation.set(-0.025 + channels.approach * 0.025, 0.58 + channels.approach * 0.08 + channels.layerSeparation * 0.05, channels.layerSeparation * 0.015);
      rig.rootGroup.updateMatrixWorld(true);
      rig.rootGroup.traverse((object) => {
        assert.ok(object.matrixWorld.elements.every(Number.isFinite));
        if (!object.geometry) return;
        assert.ok(allocated.has(object.geometry), "Geometry allocations must stay stable during scroll");
        for (const name of ["position", "normal"]) {
          const attribute = object.geometry.getAttribute(name);
          if (attribute) assert.ok(attribute.array.every(Number.isFinite), `${name} contains invalid vertices`);
        }
        if (object.parent?.name === "label-strip") {
          const positions = object.geometry.getAttribute("position");
          const point = new THREE.Vector3();
          for (let i = 0; i < positions.count; i++) {
            point.fromBufferAttribute(positions, i).applyMatrix4(object.matrixWorld);
            assert.ok(point.y >= -1.12 * scale - 0.002, `A strip layer intersects the studio floor: mobile=${mobile}, step=${step}, y=${point.y}`);
          }
        }
      });
      samples++;
    }
  }
  rig.dispose();
  assert.equal(disposed, allocated.size, "Every geometry must be released exactly once");
  material.dispose();
  fakeMaterials.textures.shadowMap.dispose();
  console.log(`${mobile ? "Mobile" : "Desktop"}: ${samples} poses; ${allocated.size} geometries; finite vertices/normals; no floor intersections; stable allocations; disposal passed.`);
}
