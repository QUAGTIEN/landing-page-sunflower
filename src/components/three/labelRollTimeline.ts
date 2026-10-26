/** Pure motion channels; independent of React, WebGL, and DOM. */
export function smoothRange(value: number, start: number, end: number) {
  const x = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return x * x * (3 - 2 * x);
}

export function computeTimelineState(progress: number) {
  const p = Math.max(0, Math.min(1, progress));
  return {
    approach: smoothRange(p, 0.08, 0.32),
    stripExtend: smoothRange(p, 0.23, 0.48),
    peelLift: smoothRange(p, 0.29, 0.48) * (1 - smoothRange(p, 0.72, 0.89)),
    layerSeparation: smoothRange(p, 0.43, 0.60) * (1 - smoothRange(p, 0.74, 0.91)),
    settle: smoothRange(p, 0.88, 1),
    focus: smoothRange(p, 0.12, 0.35),
  };
}

export type TimelineChannels = ReturnType<typeof computeTimelineState>;
