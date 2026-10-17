import { classNames } from "./classNames";

describe("Given the classNames helper", () => {
  describe("When it receives several class names", () => {
    it("Then it should join them separated by spaces", () => {
      expect(classNames("absolute", "rounded-full", "bg-neutral-900")).toBe(
        "absolute rounded-full bg-neutral-900",
      );
    });
  });

  describe("When some of the received values are conditions that did not match", () => {
    it("Then it should ignore them and keep only the class names", () => {
      const isDragging = false;

      expect(classNames("absolute", isDragging && "cursor-grabbing", null, undefined)).toBe(
        "absolute",
      );
    });
  });

  describe("When it receives no class names", () => {
    it("Then it should return an empty text", () => {
      expect(classNames()).toBe("");
    });
  });
});
