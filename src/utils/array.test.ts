import { isStrictlyAscending } from "./array";

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
