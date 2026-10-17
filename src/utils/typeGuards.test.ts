import { isFiniteNumber, isRecord } from "./typeGuards";

describe("Given the isRecord type guard", () => {
  describe.each([{}, { key: "value" }, []])(
    "When it receives the object-like value %p",
    (value) => {
      it("Then it should recognise it as a record", () => {
        expect(isRecord(value)).toBe(true);
      });
    },
  );

  describe.each([null, undefined, 1, "text", true])(
    "When it receives the non-object value %p",
    (value) => {
      it("Then it should not recognise it as a record", () => {
        expect(isRecord(value)).toBe(false);
      });
    },
  );
});

describe("Given the isFiniteNumber type guard", () => {
  describe.each([0, -1, 1.99, Number.MAX_SAFE_INTEGER])(
    "When it receives the finite number %p",
    (value) => {
      it("Then it should recognise it as a finite number", () => {
        expect(isFiniteNumber(value)).toBe(true);
      });
    },
  );

  describe.each([Number.NaN, Infinity, -Infinity, "1", null, undefined])(
    "When it receives the value %p, which is not a finite number",
    (value) => {
      it("Then it should reject it", () => {
        expect(isFiniteNumber(value)).toBe(false);
      });
    },
  );
});
