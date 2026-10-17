import { getLastIndex, isStrictlyAscending } from "./array";

describe("Given the isStrictlyAscending helper", () => {
  describe.each([[[]], [[1]], [[1, 2, 3]], [[-5, 0, 1.99, 70.99]]])(
    "When it receives %p, where every value is greater than the previous one",
    (values) => {
      it("Then it should consider the list strictly ascending", () => {
        expect(isStrictlyAscending(values)).toBe(true);
      });
    },
  );

  describe.each([
    ["descending values", [2, 1]],
    ["repeated values", [1, 1, 2]],
    ["a value lower than the previous one", [1, 3, 2]],
  ])("When it receives a list with %s", (_, values) => {
    it("Then it should not consider the list strictly ascending", () => {
      expect(isStrictlyAscending(values)).toBe(false);
    });
  });
});

describe("Given the getLastIndex helper", () => {
  describe("When it receives a list of six values", () => {
    it("Then it should return the index of the last value, 5", () => {
      expect(getLastIndex([1.99, 5.99, 10.99, 30.99, 50.99, 70.99])).toBe(5);
    });
  });

  describe("When it receives an empty list", () => {
    it("Then it should return -1, as there is no last value", () => {
      expect(getLastIndex([])).toBe(-1);
    });
  });
});
