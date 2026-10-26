import type { MutableRefObject } from "react";

export interface HeroMotionState {
  progress: number;
  pointerX: number;
  pointerY: number;
  dragX: number;
  dragY: number;
  invalidate?: () => void;
}

export interface HeroSceneMetrics {
  fps: number;
  frames: number;
  calls: number;
  triangles: number;
  textures: number;
  dpr: number;
  renderer: string;
}

export interface LabelRollSceneProps {
  motion: MutableRefObject<HeroMotionState>;
  mobile: boolean;
  active: boolean;
  onReady: () => void;
  onFailure: (reason: string) => void;
  onMetrics: (metrics: HeroSceneMetrics) => void;
}
