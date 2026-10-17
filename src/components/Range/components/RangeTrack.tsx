import type { ReactNode, RefObject } from "react";
import type { Interval } from "../types";
import { toCssPercent } from "../utils/position";

interface RangeTrackProps {
  trackRef: RefObject<HTMLDivElement | null>;
  percents: Interval;
  children: ReactNode;
}

export const RangeTrack = ({ trackRef, percents, children }: RangeTrackProps) => (
  <div ref={trackRef} className="relative h-1 flex-1 rounded-full bg-neutral-300">
    <div
      aria-hidden
      className="absolute inset-y-0 rounded-full bg-neutral-900"
      style={{
        left: toCssPercent(percents.min),
        width: toCssPercent(percents.max - percents.min),
      }}
    />
    {children}
  </div>
);
