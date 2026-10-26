"use client";

import React from "react";
import { MATERIAL_LAYERS_STORY } from "@/content/company";
import { Layers } from "lucide-react";

export interface MaterialStoryProps {
  activeLayerIndex: number | null;
  onSelectLayer: (index: number) => void;
  onTriggerExplodeView?: () => void;
  scrollProgress: number;
}

export function MaterialStory({
  activeLayerIndex,
  onSelectLayer,
  onTriggerExplodeView,
  scrollProgress,
}: MaterialStoryProps) {
  const isExplodedPhase = scrollProgress >= 0.36 && scrollProgress <= 0.76;

  return (
    <div id="cau-truc-vat-lieu" className="pt-12 lg:pt-24">
      <div className="border-t border-border pt-10">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="eyebrow">{MATERIAL_LAYERS_STORY.eyebrow}</p>
          <span
            className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider ${
              isExplodedPhase
                ? "bg-foreground text-on-dark"
                : "bg-surface text-muted-foreground"
            }`}
          >
            <Layers className="h-3 w-3 text-accent" />
            {isExplodedPhase ? "Đang tách 4 lớp (S3)" : "Cuộn hoặc chọn lớp để tách 3D"}
          </span>
        </div>

        <h2 className="heading-h2 mt-3 max-w-[20ch] text-foreground">
          {MATERIAL_LAYERS_STORY.headline}
        </h2>

        <p className="body-copy mt-4 text-muted-foreground">
          {MATERIAL_LAYERS_STORY.subtitle}
        </p>

        {/* 4 Interactive Material Layer Rows */}
        <div className="mt-8 divide-y divide-border border-y border-border">
          {MATERIAL_LAYERS_STORY.layers.map((layer, idx) => {
            const isSelected = activeLayerIndex === idx;
            return (
              <button
                key={layer.index}
                type="button"
                onClick={() => {
                  onSelectLayer(idx);
                  onTriggerExplodeView?.();
                }}
                className={`group block w-full py-5 text-left transition-colors ${
                  isSelected
                    ? "bg-surface/90 px-4 -mx-4 rounded-sm"
                    : "hover:bg-surface/50"
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-semibold text-accent">
                      {layer.index}
                    </span>
                    <h3 className="text-base font-semibold text-foreground group-hover:text-foreground">
                      {layer.nameVi}
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {layer.nameEn}
                  </span>
                </div>

                <p className="mt-2 pl-7 text-sm leading-relaxed text-muted-foreground">
                  {layer.role}
                </p>

                <div className="mt-2.5 flex flex-wrap items-center gap-2 pl-7">
                  <span className="inline-block rounded bg-background-pure px-2 py-0.5 font-mono text-[11px] text-foreground-soft ring-1 ring-border">
                    Tuỳ chọn: {layer.typicalMaterials}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Honest Technical Note */}
        <div className="mt-6 rounded-sm border border-border bg-surface/60 p-4">
          <p className="text-xs leading-relaxed text-muted-foreground">
            {MATERIAL_LAYERS_STORY.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
