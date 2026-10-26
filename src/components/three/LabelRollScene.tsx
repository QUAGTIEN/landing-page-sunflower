"use client";

import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createStudioMaterials } from "./LabelRollMaterials";
import { createLabelRollRig } from "./LabelRollModel";
import { LabelRollEnvironment } from "./LabelRollEnvironment";
import { computeTimelineState } from "./labelRollTimeline";
import type { LabelRollSceneProps } from "./sceneTypes";
import { HERO_SCENE_BUDGET } from "@/content/assets";

class CanvasBoundary extends Component<{ children: ReactNode; onFailure: (reason: string) => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure("canvas-error"); }
  render() { return this.state.failed ? null : this.props.children; }
}

function Studio({
  motion, mobile, active, onReady, onFailure, onMetrics, dpr, onSlow,
}: LabelRollSceneProps & { dpr: number; onSlow: (fps: number) => void }) {
  const { camera, gl, invalidate, size } = useThree();
  const materials = useMemo(() => createStudioMaterials(), []);
  const rig = useMemo(() => createLabelRollRig(materials, mobile), [materials, mobile]);
  const progress = useRef(0);
  const parallax = useRef({ x: 0, y: 0 });
  const frameCount = useRef(0);
  const started = useRef(false);
  const sampling = useRef({ seconds: 0, frames: 0, moving: false });
  const lookAt = useMemo(() => new THREE.Vector3(), []);
  const targetPosition = useMemo(() => new THREE.Vector3(), []);
  const rendererName = useRef("");

  useEffect(() => {
    const controls = motion.current;
    controls.invalidate = invalidate;
    const context = gl.getContext();
    const debug = context.getExtension("WEBGL_debug_renderer_info");
    rendererName.current = debug ? String(context.getParameter(debug.UNMASKED_RENDERER_WEBGL)) : String(context.getParameter(context.RENDERER));
    const canvas = gl.domElement;
    const lost = (event: Event) => {
      event.preventDefault();
      onFailure("context-lost");
    };
    canvas.addEventListener("webglcontextlost", lost);
    invalidate();
    return () => {
      canvas.removeEventListener("webglcontextlost", lost);
      controls.invalidate = undefined;
    };
  }, [gl, invalidate, motion, onFailure]);

  useEffect(() => {
    if (active) invalidate();
    else sampling.current = { seconds: 0, frames: 0, moving: false };
  }, [active, invalidate]);

  useEffect(() => () => rig.dispose(), [rig]);
  useEffect(() => () => materials.dispose(), [materials]);

  useFrame((_, rawDelta) => {
    if (!active) return;
    const lastRender = { calls: gl.info.render.calls, triangles: gl.info.render.triangles };
    gl.info.reset();
    const delta = Math.min(rawDelta, 0.06);
    frameCount.current++;
    const before = progress.current;
    progress.current = THREE.MathUtils.damp(before, motion.current.progress, 9, delta);
    const channels = computeTimelineState(progress.current);
    const pointerX = motion.current.pointerX * 0.045 + motion.current.dragX;
    const pointerY = motion.current.pointerY * 0.025 + motion.current.dragY;
    const lastX = parallax.current.x, lastY = parallax.current.y;
    parallax.current.x = THREE.MathUtils.damp(lastX, pointerX, 8, delta);
    parallax.current.y = THREE.MathUtils.damp(lastY, pointerY, 8, delta);

    const persp = camera as THREE.PerspectiveCamera;
    targetPosition.set(
      0.12 - channels.approach * (mobile ? 0.45 : 0.8) - channels.layerSeparation * (mobile ? 0.3 : 0.7),
      1.25 + channels.approach * (mobile ? 0.1 : 0.18) + channels.layerSeparation * (mobile ? 0.45 : 0.9) + parallax.current.y * 0.5,
      mobile ? 6.4 + channels.focus * 0.55 + channels.layerSeparation * 0.3 + channels.settle * 0.15 :
        6.4 - channels.approach * 0.3 + channels.layerSeparation * 0.95 + channels.settle * 0.25,
    );
    camera.position.lerp(targetPosition, 1 - Math.exp(-7 * delta));
    lookAt.set(-channels.focus * (mobile ? 0.15 : 0.30),
      -0.10 - channels.focus * (mobile ? 0 : 0.18) - channels.layerSeparation * (mobile ? 0.04 : 0.17), 0.08);
    camera.lookAt(lookAt);
    // Off-axis framing moves the composition while retaining a real floor/lighting.
    const horizontal = mobile ? 0.015 : (0.16 - channels.focus * 0.17);
    const vertical = mobile ? (0.22 - channels.focus * 0.19) : 0.015;
    persp.setViewOffset(size.width, size.height, -size.width * horizontal, -size.height * vertical, size.width, size.height);
    rig.rootGroup.scale.setScalar(mobile ? 0.68 - channels.settle * 0.03 : 1 - channels.settle * 0.08);
    rig.rollPose.rotation.set(
      -0.025 + channels.approach * 0.025,
      0.58 + channels.approach * 0.08 + channels.layerSeparation * 0.05 + parallax.current.x,
      channels.layerSeparation * 0.015,
    );
    rig.rollAssembly.rotation.z = -channels.stripExtend * 0.18;
    rig.propsGroup.position.z = -channels.focus * 0.48;
    rig.propsGroup.position.x = (mobile ? -0.12 : 0) + channels.focus * 0.15;
    rig.update(channels);

    const moving = Math.abs(progress.current - motion.current.progress) > 0.0001 ||
      Math.abs(parallax.current.x - pointerX) + Math.abs(parallax.current.y - pointerY) > 0.0001 ||
      camera.position.distanceTo(targetPosition) > 0.0001;
    const sample = sampling.current;
    // Measure contiguous animated frames only; idle demand-render gaps are not low FPS.
    if (sample.moving && rawDelta < 0.8) {
      sample.seconds += rawDelta;
      sample.frames++;
      if (sample.seconds >= 2.5 && sample.frames > 8) {
        const fps = sample.frames / sample.seconds;
        onMetrics({
          fps: Math.round(fps * 10) / 10, frames: frameCount.current,
          calls: lastRender.calls, triangles: lastRender.triangles,
          textures: gl.info.memory.textures, dpr, renderer: rendererName.current,
        });
        if (frameCount.current > 45) onSlow(fps);
        sample.seconds = 0;
        sample.frames = 0;
      }
    } else if (!sample.moving || rawDelta >= 0.8 || !moving) {
      sample.seconds = 0;
      sample.frames = 0;
    }
    sample.moving = moving;

    if (!started.current && frameCount.current >= 3) {
      started.current = true;
      requestAnimationFrame(onReady);
      onMetrics({
        fps: 0, frames: frameCount.current, calls: lastRender.calls,
        triangles: lastRender.triangles, textures: gl.info.memory.textures,
        dpr, renderer: rendererName.current,
      });
    }
    if (moving || frameCount.current < 4) invalidate();
  }, -1);

  return (
    <>
      <LabelRollEnvironment materials={materials} mobile={mobile} />
      <primitive object={rig.rootGroup} dispose={null} />
    </>
  );
}

export function LabelRollScene(props: LabelRollSceneProps) {
  const [dpr, setDpr] = useState<number>(props.mobile ? HERO_SCENE_BUDGET.mobileDpr : HERO_SCENE_BUDGET.desktopDpr);
  const slowWindows = useRef(0);
  const callbacks = useRef(props);
  callbacks.current = props;
  const onSlow = useMemo(() => (fps: number) => {
    const minimum = callbacks.current.mobile ? HERO_SCENE_BUDGET.mobileMinimumFps : HERO_SCENE_BUDGET.desktopMinimumFps;
    if (fps >= minimum) { slowWindows.current = 0; return; }
    slowWindows.current++;
    if (slowWindows.current === 1) setDpr(HERO_SCENE_BUDGET.reducedDpr);
    if (slowWindows.current >= 3) callbacks.current.onFailure("sustained-low-fps");
  }, []);

  useEffect(() => {
    setDpr(props.mobile ? HERO_SCENE_BUDGET.mobileDpr : HERO_SCENE_BUDGET.desktopDpr);
    slowWindows.current = 0;
  }, [props.mobile]);

  return (
    <CanvasBoundary onFailure={props.onFailure}>
      <Canvas
        key={props.mobile ? "mobile" : "desktop"}
        className="hero-live-canvas"
        aria-hidden="true"
        frameloop={props.active ? "demand" : "never"}
        dpr={dpr}
        camera={{ position: [0.12, 1.25, 6.4], fov: 34, near: 0.1, far: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: props.mobile ? "low-power" : "high-performance" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.08;
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.info.autoReset = false;
        }}
        fallback={null}
      >
        <Suspense fallback={null}>
          <Studio {...props} dpr={dpr} onSlow={onSlow} />
        </Suspense>
      </Canvas>
    </CanvasBoundary>
  );
}
