import React from "react";

export interface SunflowerLogoProps {
  variant?: "mono-charcoal" | "mono-light" | "brand-original";
  showWordmark?: boolean;
  showSubtext?: boolean;
  className?: string;
}

/**
 * Geometrically exact vector reconstruction of the Sunflower emblem:
 * - Symmetrical 8-tooth industrial gear (top and upper-left teeth accented in muted bronze/gold)
 * - Bold negative-space 'S' at the center
 * - Unwinding adhesive label roll at the bottom-right with 3 die-cut label pads
 */
export function SunflowerLogo({
  variant = "mono-charcoal",
  showWordmark = true,
  showSubtext = false,
  className = "",
}: SunflowerLogoProps) {
  const palette = {
    "mono-charcoal": {
      gearMain: "#171715",
      gearAccent: "#9B8974",
      cutout: "#F6F4EF",
      wordmark: "#171715",
      subtext: "#64625D",
    },
    "mono-light": {
      gearMain: "#F9F7F2",
      gearAccent: "#9B8974",
      cutout: "#171715",
      wordmark: "#F9F7F2",
      subtext: "#D4D0C8",
    },
    "brand-original": {
      gearMain: "#002B5B",
      gearAccent: "#FDB813",
      cutout: "#FFFFFF",
      wordmark: "#171715",
      subtext: "#64625D",
    },
  }[variant];

  return (
    <span className={`inline-flex items-center gap-3 select-none ${className}`}>
      <svg
        viewBox="0 0 120 112"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 w-auto shrink-0"
        aria-hidden="true"
      >
        {/* Highlighted Tooth 1: Top (90 deg) */}
        <polygon
          points="49,4 63,4 66,21 46,21"
          fill={palette.gearAccent}
        />
        {/* Highlighted Tooth 2: Upper-Left (157.5 deg) */}
        <polygon
          points="8,36 14,23 30,27 23,44"
          fill={palette.gearAccent}
        />

        {/* Remaining 6 symmetrical gear teeth */}
        {/* Upper-Right (45 deg) */}
        <polygon
          points="79,11 90,21 79,34 67,23"
          fill={palette.gearMain}
        />
        {/* Right (0 deg) */}
        <polygon
          points="91,42 106,46 106,59 90,62"
          fill={palette.gearMain}
        />
        {/* Lower-Right (-35 deg) */}
        <polygon
          points="88,69 102,77 96,89 81,82"
          fill={palette.gearMain}
        />
        {/* Upper-Left 45 deg (135 deg) */}
        <polygon
          points="24,13 36,9 44,23 31,31"
          fill={palette.gearMain}
        />
        {/* Lower-Left (205 deg) */}
        <polygon
          points="20,57 6,65 11,78 26,73"
          fill={palette.gearMain}
        />
        {/* Bottom-Left (240 deg) */}
        <polygon
          points="27,79 19,94 31,99 39,86"
          fill={palette.gearMain}
        />

        {/* Gear main circular body */}
        <circle cx="56" cy="54" r="36" fill={palette.gearMain} />

        {/* Central negative-space 'S' */}
        <path
          d="M73 32H46C39 32 34 36.8 34 43.2C34 49.6 39 54 46 54H64C67.2 54 69.5 56 69.5 59C69.5 62 67.2 64 64 64H37V72.5H64C72 72.5 77.5 67.2 77.5 59C77.5 50.8 72 45.8 64 45.8H46C43.2 45.8 41.5 44.2 41.5 42C41.5 39.8 43.2 38.2 46 38.2H73V32Z"
          fill={palette.cutout}
        />

        {/* Label roll cylinder & unwinding strip base */}
        <path
          d="M42 63C34.5 63 29 71.5 29 82.5C29 93.5 34.5 102 42 102L68 99.5C73 103.5 80 105.5 88 105.5H116L103 97.5C94 93.5 87 85.5 81 73.5L76 63H42Z"
          fill={palette.gearMain}
        />

        {/* Roll core concentric rings */}
        <ellipse cx="42" cy="82.5" rx="8.5" ry="14" fill={palette.cutout} />
        <ellipse cx="42" cy="82.5" rx="4.8" ry="8.8" fill={palette.gearMain} />

        {/* Unwinding label strip backing web */}
        <path
          d="M45 65.5H73C78.5 75 84 84 92 91.5L108 102H82C73 100 66 92 60 80L52 65.5H45Z"
          fill={palette.cutout}
        />

        {/* 3 Die-cut label pads on the unwinding strip */}
        <polygon points="55,68.5 71.5,68.5 77.5,79.5 61,79.5" fill={palette.gearAccent} />
        <polygon points="62.5,82.5 79,82.5 85.5,92 69,92" fill={palette.gearAccent} />
        <polygon points="71.5,94.5 88,94.5 96,99.5 79.5,99.5" fill={palette.gearAccent} />
      </svg>

      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className="text-lg font-bold tracking-[-0.03em]"
            style={{ color: palette.wordmark }}
          >
            SUNFLOWER
          </span>
          {showSubtext && (
            <span
              className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: palette.subtext }}
            >
              Labels &amp; Packaging
            </span>
          )}
        </span>
      )}
    </span>
  );
}
