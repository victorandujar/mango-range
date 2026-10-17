import type { ReactNode } from "react";
import type { Exercise } from "@/config/exercises";

interface ExerciseSectionProps {
  exercise: Exercise;
  children: ReactNode;
}

export const ExerciseSection = ({
  exercise: { title, subtitle, description },
  children,
}: ExerciseSectionProps) => (
  <section className="flex flex-col gap-12">
    <header className="flex flex-col gap-2">
      <p className="text-xs tracking-widest text-neutral-500 uppercase">{title}</p>
      <h1 className="text-2xl font-semibold tracking-tight">{subtitle}</h1>
      <p className="text-neutral-600">{description}</p>
    </header>
    {children}
  </section>
);
