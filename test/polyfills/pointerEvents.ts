const installPointerEventsPolyfill = () => {
  class PointerEventPolyfill extends MouseEvent {
    readonly pointerId: number;
    readonly pointerType: string;

    constructor(type: string, init: PointerEventInit = {}) {
      super(type, init);
      this.pointerId = init.pointerId ?? 0;
      this.pointerType = init.pointerType ?? "mouse";
    }
  }

  if (!("PointerEvent" in window)) {
    Object.defineProperty(window, "PointerEvent", { value: PointerEventPolyfill });
  }

  if (!("setPointerCapture" in Element.prototype)) {
    Object.assign(Element.prototype, {
      setPointerCapture: () => undefined,
      releasePointerCapture: () => undefined,
      hasPointerCapture: () => false,
    });
  }
};

if (typeof window !== "undefined") {
  installPointerEventsPolyfill();
}
