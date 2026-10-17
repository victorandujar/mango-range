import { render, screen } from "@testing-library/react";
import { RangeLabel } from "./RangeLabel";

describe("Given a label for the max thumb with the text 70,99 €", () => {
  describe("When it is rendered", () => {
    it("Then it should show the text 70,99 €", () => {
      render(<RangeLabel thumb="max" text="70,99 €" />);

      expect(screen.getByText("70,99 €")).toBeInTheDocument();
    });

    it("Then it should not offer any way to edit the value", () => {
      render(<RangeLabel thumb="max" text="70,99 €" />);

      expect(screen.queryByRole("button")).not.toBeInTheDocument();
      expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument();
    });
  });
});
