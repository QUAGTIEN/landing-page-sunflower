import { Environment } from "@react-three/drei/core/Environment";
import { Lightformer } from "@react-three/drei/core/Lightformer";
import { ContactShadows } from "@react-three/drei/core/ContactShadows";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { StudioMaterials } from "./LabelRollMaterials";

/** Local studio lighting. Environment is baked once, with no remote HDR fetch. */
export function LabelRollEnvironment({ materials, mobile }: { materials: StudioMaterials; mobile: boolean }) {
  const scale = mobile ? 0.68 : 1;
  const contact = useRef<THREE.Group>(null);
  useLayoutEffect(() => {
    // Only the product layer contributes; the cyclorama must never fill the depth pass.
    contact.current?.traverse((object) => {
      if ((object as THREE.Camera).isCamera) object.layers.set(1);
    });
  }, []);
  const backdrop = useMemo(() => {
    const profile: [number, number][] = [[35, -1.12 * scale], [-3.8, -1.12 * scale]];
    for (let i = 1; i <= 40; i++) {
      const angle = i / 40 * Math.PI / 2;
      profile.push([-3.8 - 3 * Math.sin(angle), -1.12 * scale + 3 * (1 - Math.cos(angle))]);
    }
    profile.push([-6.8, 18]);
    const positions: number[] = [], uvs: number[] = [], indices: number[] = [];
    profile.forEach(([z, y], i) => {
      positions.push(-30, y, z, 30, y, z);
      uvs.push(-2.5, (y - z) / 10, 3.5, (y - z) / 10);
      if (i < profile.length - 1) { const a = i * 2; indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }, [scale]);
  useEffect(() => () => backdrop.dispose(), [backdrop]);
  return (
    <>
      <color attach="background" args={["#e9e3d9"]} />
      <fog attach="fog" args={["#e9e3d9", 12, 30]} />
      <ambientLight intensity={0.18} color="#fff9ed" />
      <directionalLight
        position={[-3.5, 6, 5]} intensity={3.0} color="#fffcf6"
      />
      <directionalLight position={[4, 2, -1]} intensity={0.25} color="#e4d9c7" />
      <Environment resolution={mobile ? 64 : 128} frames={1} environmentIntensity={0.55}>
        <Lightformer form="rect" intensity={3.5} color="#fffaf0" position={[-3, 4, 3]} scale={[4, 5, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={1.8} color="#fffdf8" position={[4, 1, 2]} scale={[2, 5, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={1.0} color="#d0c3af" position={[0, 2, -4]} scale={[6, 3, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={0.8} color="#e8d7b9" position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[8, 8, 1]} />
      </Environment>
      <mesh geometry={backdrop} dispose={null}>
        <meshStandardMaterial color="#e2d7c4" map={materials.textures.wallMap} roughness={0.93} side={THREE.DoubleSide} />
      </mesh>
      <ContactShadows ref={contact} position={[0, -1.115 * scale, 0]} opacity={0.58} scale={8} blur={2.5} far={2.4}
        resolution={mobile ? 256 : 512} color="#6e5b40" smooth={false} frames={Infinity} />
    </>
  );
}
