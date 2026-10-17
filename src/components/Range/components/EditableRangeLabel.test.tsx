import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RANGE_ACCESSIBLE_LABELS } from "../constants";
import { EditableRangeLabel } from "./EditableRangeLabel";

const renderLabel = () => {
  const onCommit = jest.fn();
  const user = userEvent.setup();

  render(
    <EditableRangeLabel
      thumb="min"
      value={20}
      text="20 €"
      limits={{ min: 1, max: 80 }}
      step={1}
      onCommit={onCommit}
    />,
  );

  const editButton = () =>
    screen.getByRole("button", { name: RANGE_ACCESSIBLE_LABELS.editButtons.min });
  const input = () => screen.getByRole("spinbutton", { name: RANGE_ACCESSIBLE_LABELS.inputs.min });

  return { user, onCommit, editButton, input };
};

describe("Given an editable label for the min thumb with the value 20, displayed as 20 €", () => {
  describe("When it is rendered", () => {
    it("Then it should show the formatted value, 20 €, inside a button to edit the minimum value", () => {
      const { editButton } = renderLabel();

      expect(editButton()).toHaveTextContent("20 €");
    });
  });

  describe("When the user clicks on it", () => {
    it("Then it should show a focused numeric input with the raw value, 20", async () => {
      const { user, editButton, input } = renderLabel();

      await user.click(editButton());

      expect(input()).toHaveValue(20);
      expect(input()).toHaveFocus();
    });

    it("Then the input should only accept values between the limits of the thumb, 1 and 80", async () => {
      const { user, editButton, input } = renderLabel();

      await user.click(editButton());

      expect(input()).toHaveAttribute("min", "1");
      expect(input()).toHaveAttribute("max", "80");
    });
  });

  describe("When the user types 45 and presses Enter", () => {
    it("Then it should commit the new value, 45", async () => {
      const { user, onCommit, editButton, input } = renderLabel();

      await user.click(editButton());
      await user.clear(input());
      await user.type(input(), "45{Enter}");

      expect(onCommit).toHaveBeenCalledWith(45);
    });

    it("Then it should show the edit button again", async () => {
      const { user, editButton, input } = renderLabel();

      await user.click(editButton());
      await user.clear(input());
      await user.type(input(), "45{Enter}");

      expect(editButton()).toBeInTheDocument();
    });
  });
});
