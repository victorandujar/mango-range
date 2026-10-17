import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TEST_EDIT_LABELS } from "../testing/rangeTestConfig";
import { useEditableValue } from "./useEditableValue";

interface EditableTestValueProps {
  value: number;
  onCommit: (value: number) => void;
}

const EditableTestValue = ({ value, onCommit }: EditableTestValueProps) => {
  const { isEditing, startEditing, inputProps } = useEditableValue({ value, onCommit });

  return isEditing ? (
    <input aria-label={TEST_EDIT_LABELS.input} {...inputProps} />
  ) : (
    <button onClick={startEditing}>{TEST_EDIT_LABELS.button}</button>
  );
};

const renderEditableValue = (value = 20) => {
  const onCommit = jest.fn();
  const user = userEvent.setup();

  render(<EditableTestValue value={value} onCommit={onCommit} />);

  const startEditing = () =>
    user.click(screen.getByRole("button", { name: TEST_EDIT_LABELS.button }));
  const getInput = () => screen.getByRole("textbox", { name: TEST_EDIT_LABELS.input });
  const queryInput = () => screen.queryByRole("textbox", { name: TEST_EDIT_LABELS.input });

  return { user, onCommit, startEditing, getInput, queryInput };
};

describe("Given an editable value of 20 that is not being edited", () => {
  describe("When it is rendered", () => {
    it("Then no input should be shown", () => {
      const { queryInput } = renderEditableValue();

      expect(queryInput()).not.toBeInTheDocument();
    });
  });

  describe("When the user starts editing it", () => {
    it("Then an input with the current value, 20, should be shown", async () => {
      const { startEditing, getInput } = renderEditableValue();

      await startEditing();

      expect(getInput()).toHaveValue("20");
    });
  });
});

describe("Given an editable value of 20 that is being edited", () => {
  describe("When the user types 35 and presses Enter", () => {
    it("Then it should commit the new value, 35", async () => {
      const { user, onCommit, startEditing, getInput } = renderEditableValue();

      await startEditing();
      await user.clear(getInput());
      await user.type(getInput(), "35{Enter}");

      expect(onCommit).toHaveBeenCalledWith(35);
    });

    it("Then it should commit the value only once", async () => {
      const { user, onCommit, startEditing, getInput } = renderEditableValue();

      await startEditing();
      await user.clear(getInput());
      await user.type(getInput(), "35{Enter}");

      expect(onCommit).toHaveBeenCalledTimes(1);
    });

    it("Then it should stop editing and hide the input", async () => {
      const { user, startEditing, getInput, queryInput } = renderEditableValue();

      await startEditing();
      await user.clear(getInput());
      await user.type(getInput(), "35{Enter}");

      expect(queryInput()).not.toBeInTheDocument();
    });
  });

  describe("When the user types 35 and moves the focus away from the input", () => {
    it("Then it should commit the new value, 35", async () => {
      const { user, onCommit, startEditing, getInput } = renderEditableValue();

      await startEditing();
      await user.clear(getInput());
      await user.type(getInput(), "35");
      await user.tab();

      expect(onCommit).toHaveBeenCalledWith(35);
    });
  });

  describe("When the user types 35 and presses Escape", () => {
    it("Then it should discard the new value without committing it", async () => {
      const { user, onCommit, startEditing, getInput } = renderEditableValue();

      await startEditing();
      await user.clear(getInput());
      await user.type(getInput(), "35{Escape}");

      expect(onCommit).not.toHaveBeenCalled();
    });

    it("Then it should stop editing and hide the input", async () => {
      const { user, startEditing, getInput, queryInput } = renderEditableValue();

      await startEditing();
      await user.clear(getInput());
      await user.type(getInput(), "35{Escape}");

      expect(queryInput()).not.toBeInTheDocument();
    });
  });

  describe("When the user leaves the input empty and presses Enter", () => {
    it("Then it should not commit any value, as the text is not a number", async () => {
      const { user, onCommit, startEditing, getInput } = renderEditableValue();

      await startEditing();
      await user.clear(getInput());
      await user.type(getInput(), "{Enter}");

      expect(onCommit).not.toHaveBeenCalled();
    });
  });

  describe("When the user finishes editing and starts editing again", () => {
    it("Then it should commit the second edition as well", async () => {
      const { user, onCommit, startEditing, getInput } = renderEditableValue();

      await startEditing();
      await user.clear(getInput());
      await user.type(getInput(), "35{Enter}");
      await startEditing();
      await user.clear(getInput());
      await user.type(getInput(), "40{Enter}");

      expect(onCommit).toHaveBeenLastCalledWith(40);
    });
  });
});
