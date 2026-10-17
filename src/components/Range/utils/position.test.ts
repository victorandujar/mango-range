import { clampPercent, percentToValue, pointerToPercent, valueToPercent } from "./position";

describe("Given the clampPercent helper", () => {
  describe.each([
    [-10, 0],
    [0, 0],
    [42, 42],
    [100, 100],
    [130, 100],
  ])("When it receives %p%", (percent, expected) => {
    it(`Then it should keep it inside the track, returning ${expected}%`, () => {
      expect(clampPercent(percent)).toBe(expected);
    });
  });
});

describe("Given the valueToPercent converter for a range from 1 to 101", () => {
  describe.each([
    [1, 0],
    [51, 50],
    [101, 100],
    [26, 25],
  ])("When it receives the value %p", (value, expected) => {
    it(`Then it should place it at ${expected}% of the track`, () => {
      expect(valueToPercent(value, 1, 101)).toBe(expected);
    });
  });

  describe("When it receives a value below the range", () => {
    it("Then it should keep it at the start of the track, 0%", () => {
      expect(valueToPercent(-50, 1, 101)).toBe(0);
    });
  });

  describe("When it receives a value above the range", () => {
    it("Then it should keep it at the end of the track, 100%", () => {
      expect(valueToPercent(500, 1, 101)).toBe(100);
    });
  });
});

describe("Given the percentToValue converter for a range from 1 to 101", () => {
  describe.each([
    [0, 1],
    [50, 51],
    [100, 101],
    [25, 26],
  ])("When it receives %p% of the track", (percent, expected) => {
    it(`Then it should return the value ${expected}`, () => {
      expect(percentToValue(percent, 1, 101)).toBe(expected);
    });
  });

  describe("When the result is converted back to a percentage", () => {
    it("Then it should match the original percentage", () => {
      const value = percentToValue(37.5, 1, 101);

      expect(valueToPercent(value, 1, 101)).toBe(37.5);
    });
  });
});

describe("Given the pointerToPercent converter for a track 200px wide that starts at 100px", () => {
  const track = { left: 100, width: 200 };

  describe.each([
    [100, 0],
    [150, 25],
    [200, 50],
    [300, 100],
  ])("When the pointer is at the horizontal coordinate %ppx", (clientX, expected) => {
    it(`Then it should return ${expected}% of the track`, () => {
      expect(pointerToPercent(clientX, track)).toBe(expected);
    });
  });

  describe("When the pointer is to the left of the track", () => {
    it("Then it should return the start of the track, 0%", () => {
      expect(pointerToPercent(20, track)).toBe(0);
    });
  });

  describe("When the pointer is to the right of the track", () => {
    it("Then it should return the end of the track, 100%", () => {
      expect(pointerToPercent(900, track)).toBe(100);
    });
  });

  describe("When the track has not been laid out yet and its width is 0", () => {
    it("Then it should return the start of the track, 0%", () => {
      expect(pointerToPercent(150, { left: 100, width: 0 })).toBe(0);
    });
  });
});
