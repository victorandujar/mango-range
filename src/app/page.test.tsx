import { render, screen, within } from "@testing-library/react";
import { EXERCISES } from "@/config/exercises";
import { SITE_CONFIG } from "@/config/site";
import { UI_TEXTS } from "@/constants/texts";
import Home from "./page";

describe("Given the home page", () => {
  describe("When it is rendered", () => {
    it("Then it should show the site name as the main heading", () => {
      render(<Home />);

      expect(screen.getByRole("heading", { level: 1, name: SITE_CONFIG.name })).toBeInTheDocument();
    });

    it("Then it should list both exercises", () => {
      render(<Home />);

      const exercises = screen.getByRole("list", { name: UI_TEXTS.home.exercisesLabel });

      expect(within(exercises).getAllByRole("link")).toHaveLength(2);
    });

    it.each([EXERCISES.normal, EXERCISES.fixed])(
      "Then it should link to $title from a card that describes it",
      ({ href, title, subtitle }) => {
        render(<Home />);

        const link = screen.getByRole("link", { name: new RegExp(title) });

        expect(link).toHaveAttribute("href", href);
        expect(link).toHaveTextContent(subtitle);
      },
    );
  });
});
