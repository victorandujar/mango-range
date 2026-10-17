import { isStrictlyAscending } from "./array";

describe("isStrictlyAscending", () => {
  it.each([[[]], [[1]], [[1, 2, 3]], [[-5, 0, 1.99, 70.99]]])("returns true for %p", (values) => {
    expect(isStrictlyAscending(values)).toBe(true);
  });

  it.each([[[2, 1]], [[1, 1, 2]], [[1, 3, 2]]])("returns false for %p", (values) => {
    expect(isStrictlyAscending(values)).toBe(false);
  });
});
