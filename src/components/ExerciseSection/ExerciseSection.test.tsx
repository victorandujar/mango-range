import { render, screen } from "@testing-library/react";
import { EXERCISES } from "@/config/exercises";
import { ExerciseSection } from "./ExerciseSection";

const renderSection = () =>
  render(
    <ExerciseSection exercise={EXERCISES.normal}>
      <p>Exercise content</p>
    </ExerciseSection>,
  );

describe("Given the section of the normal range exercise", () => {
  describe("When it is rendered", () => {
    it("Then it should show the exercise subtitle as the main heading", () => {
      renderSection();

      expect(
        screen.getByRole("heading", { level: 1, name: EXERCISES.normal.subtitle }),
      ).toBeInTheDocument();
    });

    it("Then it should show the exercise title and its description", () => {
      renderSection();

      expect(screen.getByText(EXERCISES.normal.title)).toBeInTheDocument();
      expect(screen.getByText(EXERCISES.normal.description)).toBeInTheDocument();
    });

    it("Then it should render the exercise content", () => {
      renderSection();

      expect(screen.getByText("Exercise content")).toBeInTheDocument();
    });
  });
});
