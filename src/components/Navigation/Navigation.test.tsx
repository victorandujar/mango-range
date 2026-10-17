import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { EXERCISES } from "@/config/exercises";
import { UI_TEXTS } from "@/constants/texts";
import { Navigation } from "./Navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

const usePathnameMock = jest.mocked(usePathname);

const renderNavigation = (pathname: string) => {
  usePathnameMock.mockReturnValue(pathname);

  render(<Navigation />);

  return {
    navigation: screen.getByRole("navigation", { name: UI_TEXTS.navigation.label }),
    exercise1Link: screen.getByRole("link", { name: EXERCISES.normal.title }),
    exercise2Link: screen.getByRole("link", { name: EXERCISES.fixed.title }),
  };
};

describe("Given the main navigation", () => {
  describe("When it is rendered on the home page", () => {
    it("Then it should be exposed as the main navigation landmark", () => {
      const { navigation } = renderNavigation("/");

      expect(navigation).toBeInTheDocument();
    });

    it("Then it should link to both exercises", () => {
      const { exercise1Link, exercise2Link } = renderNavigation("/");

      expect(exercise1Link).toHaveAttribute("href", EXERCISES.normal.href);
      expect(exercise2Link).toHaveAttribute("href", EXERCISES.fixed.href);
    });

    it("Then no link should be marked as the current page", () => {
      const { exercise1Link, exercise2Link } = renderNavigation("/");

      expect(exercise1Link).not.toHaveAttribute("aria-current");
      expect(exercise2Link).not.toHaveAttribute("aria-current");
    });
  });

  describe("When it is rendered on the exercise 1 page", () => {
    it("Then the exercise 1 link should be marked as the current page", () => {
      const { exercise1Link } = renderNavigation(EXERCISES.normal.href);

      expect(exercise1Link).toHaveAttribute("aria-current", "page");
    });

    it("Then the exercise 2 link should not be marked as the current page", () => {
      const { exercise2Link } = renderNavigation(EXERCISES.normal.href);

      expect(exercise2Link).not.toHaveAttribute("aria-current");
    });
  });
});
