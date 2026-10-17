import { getKeyboardValue } from "./keyboard";

const bounds = { min: 1, max: 100 };

describe("Given a thumb with the value 50 in a range from 1 to 100 with a step of 1", () => {
  describe.each([
    ["ArrowRight", 51],
    ["ArrowUp", 51],
    ["ArrowLeft", 49],
    ["ArrowDown", 49],
  ])("When the %s key is pressed", (key, expected) => {
    it(`Then the next value should be one step away, ${expected}`, () => {
      expect(getKeyboardValue(key, 50, 1, bounds)).toBe(expected);
    });
  });

  describe.each([
    ["PageUp", 60],
    ["PageDown", 40],
  ])("When the %s key is pressed", (key, expected) => {
    it(`Then the next value should be ten steps away, ${expected}`, () => {
      expect(getKeyboardValue(key, 50, 1, bounds)).toBe(expected);
    });
  });

  describe("When the Home key is pressed", () => {
    it("Then the next value should be the lower bound, 1", () => {
      expect(getKeyboardValue("Home", 50, 1, bounds)).toBe(1);
    });
  });

  describe("When the End key is pressed", () => {
    it("Then the next value should be the upper bound, 100", () => {
      expect(getKeyboardValue("End", 50, 1, bounds)).toBe(100);
    });
  });

  describe.each(["Enter", "Tab", "a"])(
    "When the %s key, which does not move thumbs, is pressed",
    (key) => {
      it("Then it should return null so the key keeps its default behaviour", () => {
        expect(getKeyboardValue(key, 50, 1, bounds)).toBeNull();
      });
    },
  );
});

describe("Given a thumb with the value 50 and a step of 5", () => {
  describe("When the ArrowRight key is pressed", () => {
    it("Then the next value should be one step of 5 away, 55", () => {
      expect(getKeyboardValue("ArrowRight", 50, 5, bounds)).toBe(55);
    });
  });

  describe("When the PageDown key is pressed", () => {
    it("Then the next value should be ten steps of 5 away, 0", () => {
      expect(getKeyboardValue("PageDown", 50, 5, bounds)).toBe(0);
    });
  });
});
