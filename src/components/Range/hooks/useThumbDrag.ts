import { useState } from "react";
import type { PointerEvent, RefObject } from "react";
import { PRIMARY_POINTER_BUTTON } from "../constants";
import type { Thumb } from "../types";
import { pointerToPercent } from "../utils/position";

interface UseThumbDragOptions {
  trackRef: RefObject<HTMLElement | null>;
  onDragStart: (thumb: Thumb) => void;
  onDrag: (thumb: Thumb, percent: number) => void;
}

export const useThumbDrag = ({ trackRef, onDragStart, onDrag }: UseThumbDragOptions) => {
  const [draggingThumb, setDraggingThumb] = useState<Thumb | null>(null);

  const stopDrag = () => setDraggingThumb(null);

  const getDragHandlers = (thumb: Thumb) => ({
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      if (event.button !== PRIMARY_POINTER_BUTTON) return;

      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.focus();
      setDraggingThumb(thumb);
      onDragStart(thumb);
    },
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      if (draggingThumb !== thumb || !trackRef.current) return;

      onDrag(thumb, pointerToPercent(event.clientX, trackRef.current.getBoundingClientRect()));
    },
    onPointerUp: stopDrag,
    onPointerCancel: stopDrag,
  });

  return { draggingThumb, getDragHandlers };
};
