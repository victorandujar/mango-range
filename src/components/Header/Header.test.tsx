import { render, screen } from "@testing-library/react";
import { ROUTES } from "@/config/routes";
import { SITE_CONFIG } from "@/config/site";
import { UI_TEXTS } from "@/constants/texts";
import { Header } from "./Header";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Given the site header", () => {
  describe("When it is rendered", () => {
    it("Then it should show the site name as a link to the home page", () => {
      render(<Header />);

      expect(screen.getByRole("link", { name: SITE_CONFIG.name })).toHaveAttribute(
        "href",
        ROUTES.home,
      );
    });

    it("Then it should include the main navigation", () => {
      render(<Header />);

      expect(
        screen.getByRole("navigation", { name: UI_TEXTS.navigation.label }),
      ).toBeInTheDocument();
    });
  });
});
