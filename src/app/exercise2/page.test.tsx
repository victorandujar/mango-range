import { render, screen } from "@testing-library/react";
import { EXERCISES } from "@/config/exercises";
import { fixedRangeMock } from "@/mocks/range";
import Exercise2Page from "./page";

const renderPage = async () => render(await Exercise2Page());

describe("Given the exercise 2 page", () => {
  describe("When it is rendered with the range values from the service", () => {
    it("Then it should show the fixed values range exercise heading", async () => {
      await renderPage();

      expect(
        screen.getByRole("heading", { level: 1, name: EXERCISES.fixed.subtitle }),
      ).toBeInTheDocument();
    });

    it("Then the sliders should start at the first and the last values, 1.99 and 70.99", async () => {
      await renderPage();

      const [minThumb, maxThumb] = screen.getAllByRole("slider");

      expect(minThumb).toHaveAttribute("aria-valuenow", String(fixedRangeMock.rangeValues.at(0)));
      expect(maxThumb).toHaveAttribute("aria-valuenow", String(fixedRangeMock.rangeValues.at(-1)));
    });

    it("Then the limits should be shown as euro prices, 1,99 € and 70,99 €", async () => {
      await renderPage();

      expect(screen.getByText(/^1,99\s€$/)).toBeInTheDocument();
      expect(screen.getByText(/^70,99\s€$/)).toBeInTheDocument();
    });

    it("Then the currency values should only be labels and not be editable", async () => {
      await renderPage();

      expect(screen.queryByRole("button")).not.toBeInTheDocument();
      expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument();
    });
  });
});
