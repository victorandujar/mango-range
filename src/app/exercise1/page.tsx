import type { Metadata } from "next";
import { ExerciseSection } from "@/components/ExerciseSection";
import { Range } from "@/components/Range";
import { EXERCISES } from "@/config/exercises";
import { PRICE_FORMAT } from "@/config/format";
import { getNormalRange } from "@/services/rangeService";

export const metadata: Metadata = {
  title: EXERCISES.normal.title,
};

export default async function Exercise1Page() {
  const { min, max } = await getNormalRange();

  return (
    <ExerciseSection exercise={EXERCISES.normal}>
      <Range min={min} max={max} format={PRICE_FORMAT} />
    </ExerciseSection>
  );
}
