import { ROUTES } from "./routes";

export const EXERCISES = {
  normal: {
    href: ROUTES.exercise1,
    title: "Exercise 1",
    subtitle: "Normal range",
    description:
      "Drag the handles or click on a label to set any value between the minimum and the maximum.",
  },
  fixed: {
    href: ROUTES.exercise2,
    title: "Exercise 2",
    subtitle: "Fixed values range",
    description: "Drag the handles to select one of the available prices.",
  },
} as const;

export const EXERCISE_LIST = [EXERCISES.normal, EXERCISES.fixed] as const;
