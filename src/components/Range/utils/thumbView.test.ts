import { getRangeModel } from "./rangeModel";
import { getThumbView } from "./thumbView";

const formatEuros = (value: number) => `${value} €`;

describe("Given a normal range from 1 to 100 with a selection from 20 to 80", () => {
  const model = getRangeModel({ min: 1, max: 100 });
  const selection = { min: 20, max: 80 };

  describe("When the view of the min thumb is built", () => {
    it("Then it should show the value 20 formatted as 20 € and move between 1 and 80", () => {
      expect(getThumbView("min", selection, model, formatEuros)).toEqual({
        value: 20,
        text: "20 €",
        limits: { min: 1, max: 80 },
      });
    });
  });

  describe("When the view of the max thumb is built", () => {
    it("Then it should show the value 80 formatted as 80 € and move between 20 and 100", () => {
      expect(getThumbView("max", selection, model, formatEuros)).toEqual({
        value: 80,
        text: "80 €",
        limits: { min: 20, max: 100 },
      });
    });
  });
});

describe("Given a fixed range of six values with a selection from index 1 to index 4", () => {
  const model = getRangeModel({ values: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99] });
  const selection = { min: 1, max: 4 };

  describe("When the view of the min thumb is built", () => {
    it("Then it should translate the indexes into the fixed values, showing 5.99 and moving between 1.99 and 50.99", () => {
      expect(getThumbView("min", selection, model, formatEuros)).toEqual({
        value: 5.99,
        text: "5.99 €",
        limits: { min: 1.99, max: 50.99 },
      });
    });
  });

  describe("When the view of the max thumb is built", () => {
    it("Then it should translate the indexes into the fixed values, showing 50.99 and moving between 5.99 and 70.99", () => {
      expect(getThumbView("max", selection, model, formatEuros)).toEqual({
        value: 50.99,
        text: "50.99 €",
        limits: { min: 5.99, max: 70.99 },
      });
    });
  });
});
