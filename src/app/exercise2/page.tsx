import type { Metadata } from "next";
import { ExerciseSection } from "@/components/ExerciseSection";
import { Range } from "@/components/Range";
import { EXERCISES } from "@/config/exercises";
import { PRICE_FORMAT } from "@/config/format";
import { getFixedRange } from "@/services/rangeService";

export const metadata: Metadata = {
  title: EXERCISES.fixed.title,
};

export default async function Exercise2Page() {
  const { rangeValues } = await getFixedRange();

  return (
    <ExerciseSection exercise={EXERCISES.fixed}>
      <Range values={rangeValues} format={PRICE_FORMAT} />
    </ExerciseSection>
  );
}
