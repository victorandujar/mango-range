import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RANGE_ACCESSIBLE_LABELS } from "./constants";
import { Range } from "./Range";
import { TEST_EURO_FORMAT, TEST_FIXED_VALUES } from "./testing/rangeTestConfig";
import { mockElementBounds } from "./testing/rangeTestUtils";
import type { RangeProps, Thumb } from "./types";

const renderRange = (props: RangeProps) => {
  const user = userEvent.setup();

  render(<Range {...props} />);

  const getThumb = (thumb: Thumb) =>
    screen.getByRole("slider", { name: RANGE_ACCESSIBLE_LABELS.thumbs[thumb] });
  const getEditButton = (thumb: Thumb) =>
    screen.getByRole("button", { name: RANGE_ACCESSIBLE_LABELS.editButtons[thumb] });
  const getInput = (thumb: Thumb) =>
    screen.getByRole("spinbutton", { name: RANGE_ACCESSIBLE_LABELS.inputs[thumb] });

  const track = getThumb("min").parentElement;

  if (track) mockElementBounds(track, { left: 0, width: 200 });

  const dragThumb = (thumb: Thumb, clientX: number) => {
    fireEvent.pointerDown(getThumb(thumb), { pointerId: 1 });
    fireEvent.pointerMove(getThumb(thumb), { pointerId: 1, clientX });
    fireEvent.pointerUp(getThumb(thumb), { pointerId: 1 });
  };

  const editLabel = async (thumb: Thumb, text: string) => {
    await user.click(getEditButton(thumb));
    await user.clear(getInput(thumb));
    await user.type(getInput(thumb), `${text}{Enter}`);
  };

  return { getThumb, getEditButton, dragThumb, editLabel };
};

describe("Given a normal Range from 1 to 101 in euros, on a track 200px wide", () => {
  const props = { min: 1, max: 101, format: TEST_EURO_FORMAT };

  describe("When it is rendered", () => {
    it("Then it should show a min and a max slider at both ends of the range, 1 and 101", () => {
      const { getThumb } = renderRange(props);

      expect(getThumb("min")).toHaveAttribute("aria-valuenow", "1");
      expect(getThumb("max")).toHaveAttribute("aria-valuenow", "101");
    });

    it("Then it should show both limits as editable labels, €1 and €101", () => {
      const { getEditButton } = renderRange(props);

      expect(getEditButton("min")).toHaveTextContent(/^€1$/);
      expect(getEditButton("max")).toHaveTextContent(/^€101$/);
    });

    it("Then it should not use an HTML range input", () => {
      const { container } = render(<Range {...props} />);

      expect(container.querySelector('input[type="range"]')).not.toBeInTheDocument();
    });
  });

  describe("When the min thumb is dragged to the middle of the track", () => {
    it("Then the min value should be 51 and its label should show €51", () => {
      const { getThumb, getEditButton, dragThumb } = renderRange(props);

      dragThumb("min", 100);

      expect(getThumb("min")).toHaveAttribute("aria-valuenow", "51");
      expect(getEditButton("min")).toHaveTextContent("€51");
    });

    it("Then the min thumb should be placed at 50% of the track", () => {
      const { getThumb, dragThumb } = renderRange(props);

      dragThumb("min", 100);

      expect(getThumb("min")).toHaveStyle({ left: "50%" });
    });
  });

  describe("When the min thumb is being dragged", () => {
    it("Then its cursor should indicate that it is being dragged", () => {
      const { getThumb } = renderRange(props);

      fireEvent.pointerDown(getThumb("min"), { pointerId: 1 });

      expect(getThumb("min")).toHaveClass("cursor-grabbing");
    });

    it("Then its cursor should go back to grab when it is released", () => {
      const { getThumb } = renderRange(props);

      fireEvent.pointerDown(getThumb("min"), { pointerId: 1 });
      fireEvent.pointerUp(getThumb("min"), { pointerId: 1 });

      expect(getThumb("min")).toHaveClass("cursor-grab");
    });
  });

  describe("When the max thumb is dragged to 30px and the min thumb is then dragged past it", () => {
    it("Then the min thumb should stop at the max value, 16, without crossing it", () => {
      const { getThumb, dragThumb } = renderRange(props);

      dragThumb("max", 30);
      dragThumb("min", 180);

      expect(getThumb("min")).toHaveAttribute("aria-valuenow", "16");
      expect(getThumb("max")).toHaveAttribute("aria-valuenow", "16");
    });
  });

  describe("When the max thumb is dragged beyond the end of the track", () => {
    it("Then the max value should never be greater than the max of the range, 101", () => {
      const { getThumb, dragThumb } = renderRange(props);

      dragThumb("max", 900);

      expect(getThumb("max")).toHaveAttribute("aria-valuenow", "101");
    });
  });

  describe("When the ArrowRight key is pressed on the focused min thumb", () => {
    it("Then the min value should increase one step, to 2", () => {
      const { getThumb } = renderRange(props);

      fireEvent.keyDown(getThumb("min"), { key: "ArrowRight" });

      expect(getThumb("min")).toHaveAttribute("aria-valuenow", "2");
    });
  });

  describe("When the user clicks on the min label and types 30", () => {
    it("Then the min value should be 30 and its label should show €30", async () => {
      const { getThumb, getEditButton, editLabel } = renderRange(props);

      await editLabel("min", "30");

      expect(getThumb("min")).toHaveAttribute("aria-valuenow", "30");
      expect(getEditButton("min")).toHaveTextContent("€30");
    });

    it("Then the max thumb should not be able to go below 30 anymore", async () => {
      const { getThumb, editLabel } = renderRange(props);

      await editLabel("min", "30");

      expect(getThumb("max")).toHaveAttribute("aria-valuemin", "30");
    });
  });

  describe("When the user clicks on the min label and types a value below the range, -5", () => {
    it("Then the min value should stay at the min of the range, 1", async () => {
      const { getThumb, editLabel } = renderRange(props);

      await editLabel("min", "-5");

      expect(getThumb("min")).toHaveAttribute("aria-valuenow", "1");
    });
  });

  describe("When the user sets the max label to 40 and then the min label to 90", () => {
    it("Then the min value should stop at the max value, 40, without crossing it", async () => {
      const { getThumb, editLabel } = renderRange(props);

      await editLabel("max", "40");
      await editLabel("min", "90");

      expect(getThumb("min")).toHaveAttribute("aria-valuenow", "40");
    });
  });
});

describe("Given a fixed Range with the values 1.99, 5.99, 10.99, 30.99, 50.99 and 70.99 in euros", () => {
  const props = { values: TEST_FIXED_VALUES, format: TEST_EURO_FORMAT };

  describe("When it is rendered", () => {
    it("Then it should select the first and the last values, 1.99 and 70.99", () => {
      const { getThumb } = renderRange(props);

      expect(getThumb("min")).toHaveAttribute("aria-valuenow", "1.99");
      expect(getThumb("max")).toHaveAttribute("aria-valuenow", "70.99");
    });

    it("Then it should show the currency values as plain labels, €1.99 and €70.99", () => {
      renderRange(props);

      expect(screen.getByText("€1.99")).toBeInTheDocument();
      expect(screen.getByText("€70.99")).toBeInTheDocument();
    });

    it("Then the labels should not be editable", () => {
      renderRange(props);

      expect(screen.queryByRole("button")).not.toBeInTheDocument();
      expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument();
    });
  });

  describe("When the min thumb is dragged to 90px, between the second and the third value", () => {
    it("Then it should snap to the closest value, 10.99, and show it in its label", () => {
      const { getThumb, dragThumb } = renderRange(props);

      dragThumb("min", 90);

      expect(getThumb("min")).toHaveAttribute("aria-valuenow", "10.99");
      expect(screen.getByText("€10.99")).toBeInTheDocument();
    });

    it("Then the min thumb should be placed exactly on the third value, at 40% of the track", () => {
      const { getThumb, dragThumb } = renderRange(props);

      dragThumb("min", 90);

      expect(getThumb("min")).toHaveStyle({ left: "40%" });
    });
  });

  describe("When the ArrowLeft key is pressed on the max thumb", () => {
    it("Then the max thumb should move to the previous value, 50.99", () => {
      const { getThumb } = renderRange(props);

      fireEvent.keyDown(getThumb("max"), { key: "ArrowLeft" });

      expect(getThumb("max")).toHaveAttribute("aria-valuenow", "50.99");
    });
  });

  describe("When the min thumb is dragged beyond the max thumb", () => {
    it("Then both thumbs should share the last value, 70.99, without crossing", () => {
      const { getThumb, dragThumb } = renderRange(props);

      dragThumb("min", 900);

      expect(getThumb("min")).toHaveAttribute("aria-valuenow", "70.99");
      expect(getThumb("max")).toHaveAttribute("aria-valuenow", "70.99");
    });
  });
});

describe("Given a normal Range from 1 to 100 without a format", () => {
  describe("When it is rendered", () => {
    it("Then the labels should show the plain numbers, 1 and 100", () => {
      const { getEditButton } = renderRange({ min: 1, max: 100 });

      expect(getEditButton("min")).toHaveTextContent(/^1$/);
      expect(getEditButton("max")).toHaveTextContent(/^100$/);
    });
  });
});
