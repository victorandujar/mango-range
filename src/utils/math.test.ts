import { clamp, roundToStep } from "./math";

describe("Given the clamp helper with the limits 1 and 100", () => {
  describe("When it receives a value inside the limits", () => {
    it("Then it should return the same value", () => {
      expect(clamp(50, 1, 100)).toBe(50);
    });
  });

  describe("When it receives a value lower than the min limit", () => {
    it("Then it should return the min limit", () => {
      expect(clamp(-20, 1, 100)).toBe(1);
    });
  });

  describe("When it receives a value greater than the max limit", () => {
    it("Then it should return the max limit", () => {
      expect(clamp(250, 1, 100)).toBe(100);
    });
  });

  describe.each([1, 100])("When it receives the limit %p itself", (limit) => {
    it("Then it should return the limit unchanged", () => {
      expect(clamp(limit, 1, 100)).toBe(limit);
    });
  });
});

describe("Given the roundToStep helper", () => {
  describe.each([
    [12.4, 12],
    [12.5, 13],
    [12.6, 13],
  ])("When it receives %p with a step of 1", (value, expected) => {
    it(`Then it should round it to the closest step, ${expected}`, () => {
      expect(roundToStep(value, 1)).toBe(expected);
    });
  });

  describe("When it receives 23 with a step of 5", () => {
    it("Then it should round it to the closest multiple of 5, 25", () => {
      expect(roundToStep(23, 5)).toBe(25);
    });
  });

  describe("When it receives 23 with a step of 5 starting from the origin 1", () => {
    it("Then it should round it to the closest step counted from the origin, 21", () => {
      expect(roundToStep(23, 5, 1)).toBe(21);
    });
  });

  describe("When it receives 1.3 with a step of 0.5", () => {
    it("Then it should round it to the closest half, 1.5", () => {
      expect(roundToStep(1.3, 0.5)).toBe(1.5);
    });
  });
});
