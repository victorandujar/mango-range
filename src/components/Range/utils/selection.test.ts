import { constrainThumbValue, getThumbLimits, updateSelection } from "./selection";

const bounds = { min: 1, max: 100 };
const selection = { min: 20, max: 80 };

describe("Given a range from 1 to 100 with a selection from 20 to 80, when the limits of each thumb are requested", () => {
  describe("When the limits of the min thumb are requested", () => {
    it("Then they should go from the lower bound, 1, to the max thumb value, 80", () => {
      expect(getThumbLimits("min", selection, bounds)).toEqual({ min: 1, max: 80 });
    });
  });

  describe("When the limits of the max thumb are requested", () => {
    it("Then they should go from the min thumb value, 20, to the upper bound, 100", () => {
      expect(getThumbLimits("max", selection, bounds)).toEqual({ min: 20, max: 100 });
    });
  });
});

describe("Given a range from 1 to 100 with a selection from 20 to 80", () => {
  describe("When the min thumb is moved to 50, between the lower bound and the max thumb", () => {
    it("Then the min thumb should take the value 50", () => {
      expect(constrainThumbValue("min", 50, selection, bounds)).toBe(50);
    });
  });

  describe("When the min thumb is moved below the lower bound, to -10", () => {
    it("Then the min thumb should stop at the lower bound, 1", () => {
      expect(constrainThumbValue("min", -10, selection, bounds)).toBe(1);
    });
  });

  describe("When the min thumb is moved past the max thumb, to 95", () => {
    it("Then the min thumb should stop at the max thumb value, 80, without crossing it", () => {
      expect(constrainThumbValue("min", 95, selection, bounds)).toBe(80);
    });
  });

  describe("When the max thumb is moved to 60, between the min thumb and the upper bound", () => {
    it("Then the max thumb should take the value 60", () => {
      expect(constrainThumbValue("max", 60, selection, bounds)).toBe(60);
    });
  });

  describe("When the max thumb is moved above the upper bound, to 250", () => {
    it("Then the max thumb should stop at the upper bound, 100", () => {
      expect(constrainThumbValue("max", 250, selection, bounds)).toBe(100);
    });
  });

  describe("When the max thumb is moved past the min thumb, to 5", () => {
    it("Then the max thumb should stop at the min thumb value, 20, without crossing it", () => {
      expect(constrainThumbValue("max", 5, selection, bounds)).toBe(20);
    });
  });

  describe("When the selection is updated by moving the min thumb to 30", () => {
    it("Then it should return a new selection from 30 to 80", () => {
      expect(updateSelection(selection, "min", 30, bounds)).toEqual({ min: 30, max: 80 });
    });

    it("Then it should keep the original selection untouched", () => {
      updateSelection(selection, "min", 30, bounds);

      expect(selection).toEqual({ min: 20, max: 80 });
    });
  });

  describe("When the selection is updated by moving the max thumb past the min thumb", () => {
    it("Then it should return a selection where both thumbs share the min value, 20", () => {
      expect(updateSelection(selection, "max", 10, bounds)).toEqual({ min: 20, max: 20 });
    });
  });
});

describe("Given a range from 1 to 100 with a selection from 20 to 80, when a thumb lands exactly on the other one", () => {
  describe("When the min thumb is moved to 80, the value of the max thumb", () => {
    it("Then the min thumb should take the value 80, so both thumbs can meet", () => {
      expect(constrainThumbValue("min", 80, selection, bounds)).toBe(80);
    });
  });

  describe("When the max thumb is moved to 20, the value of the min thumb", () => {
    it("Then the max thumb should take the value 20, so both thumbs can meet", () => {
      expect(constrainThumbValue("max", 20, selection, bounds)).toBe(20);
    });
  });
});

describe("Given a range from 1 to 100 with both thumbs collapsed at 20", () => {
  const collapsedSelection = { min: 20, max: 20 };

  describe("When the min thumb is moved forward, to 30", () => {
    it("Then the min thumb should stay at 20, blocked by the max thumb", () => {
      expect(updateSelection(collapsedSelection, "min", 30, bounds)).toEqual({ min: 20, max: 20 });
    });
  });

  describe("When the min thumb is moved backward, to 10", () => {
    it("Then the min thumb should move freely and the selection should go from 10 to 20", () => {
      expect(updateSelection(collapsedSelection, "min", 10, bounds)).toEqual({ min: 10, max: 20 });
    });
  });

  describe("When the max thumb is moved backward, to 10", () => {
    it("Then the max thumb should stay at 20, blocked by the min thumb", () => {
      expect(updateSelection(collapsedSelection, "max", 10, bounds)).toEqual({ min: 20, max: 20 });
    });
  });

  describe("When the max thumb is moved forward, to 30", () => {
    it("Then the max thumb should move freely and the selection should go from 20 to 30", () => {
      expect(updateSelection(collapsedSelection, "max", 30, bounds)).toEqual({ min: 20, max: 30 });
    });
  });
});

describe("Given a range from 1 to 100 with the whole range selected", () => {
  const fullSelection = { min: 1, max: 100 };

  describe("When the min thumb is pushed below the lower bound, to 0", () => {
    it("Then the selection should remain from 1 to 100", () => {
      expect(updateSelection(fullSelection, "min", 0, bounds)).toEqual(fullSelection);
    });
  });

  describe("When the max thumb is pushed above the upper bound, to 101", () => {
    it("Then the selection should remain from 1 to 100", () => {
      expect(updateSelection(fullSelection, "max", 101, bounds)).toEqual(fullSelection);
    });
  });
});

describe("Given a fixed range of six values handled by their indexes, from 0 to 5, with a selection from index 1 to 4", () => {
  const indexBounds = { min: 0, max: 5 };
  const indexSelection = { min: 1, max: 4 };

  describe("When the min thumb is moved to the last index, 5", () => {
    it("Then the min thumb should stop at the index of the max thumb, 4", () => {
      expect(updateSelection(indexSelection, "min", 5, indexBounds)).toEqual({ min: 4, max: 4 });
    });
  });

  describe("When the max thumb is moved beyond the last index, to 6", () => {
    it("Then the max thumb should stop at the last index, 5", () => {
      expect(updateSelection(indexSelection, "max", 6, indexBounds)).toEqual({ min: 1, max: 5 });
    });
  });

  describe("When the min thumb is moved before the first index, to -1", () => {
    it("Then the min thumb should stop at the first index, 0", () => {
      expect(updateSelection(indexSelection, "min", -1, indexBounds)).toEqual({ min: 0, max: 4 });
    });
  });
});
