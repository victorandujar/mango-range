import { render, screen } from "@testing-library/react";
import { EXERCISES } from "@/config/exercises";
import { normalRangeMock } from "@/mocks/range";
import Exercise1Page from "./page";

const renderPage = async () => render(await Exercise1Page());

describe("Given the exercise 1 page", () => {
  describe("When it is rendered with the range data from the service", () => {
    it("Then it should show the normal range exercise heading", async () => {
      await renderPage();

      expect(
        screen.getByRole("heading", { level: 1, name: EXERCISES.normal.subtitle }),
      ).toBeInTheDocument();
    });

    it("Then the min and max sliders should start at the limits provided by the service, 1 and 100", async () => {
      await renderPage();

      const [minThumb, maxThumb] = screen.getAllByRole("slider");

      expect(minThumb).toHaveAttribute("aria-valuenow", String(normalRangeMock.min));
      expect(maxThumb).toHaveAttribute("aria-valuenow", String(normalRangeMock.max));
    });

    it("Then the limits should be shown as euro prices, 1 € and 100 €", async () => {
      await renderPage();

      const [minThumb, maxThumb] = screen.getAllByRole("slider");

      expect(minThumb).toHaveAttribute("aria-valuetext", expect.stringMatching(/^1\s€$/));
      expect(maxThumb).toHaveAttribute("aria-valuetext", expect.stringMatching(/^100\s€$/));
    });

    it("Then both limits should be editable labels", async () => {
      await renderPage();

      expect(screen.getAllByRole("button")).toHaveLength(2);
    });
  });
});
