import { expect, test } from "@playwright/test";
import { FIRST_INDEX } from "@/constants/array";
import { valueToPercent } from "@/components/Range/utils/position";
import { getFixedValue } from "@/components/Range/utils/rangeModel";
import { EXERCISES } from "@/config/exercises";
import { fixedRangeMock } from "@/mocks/range";
import { getLastIndex } from "@/utils/array";
import { formatPrice } from "./support/formatPrice";
import { createRangePage } from "./support/rangePage";

const { rangeValues } = fixedRangeMock;
const lastIndex = getLastIndex(rangeValues);
const percentOfIndex = (index: number) => valueToPercent(index, FIRST_INDEX, lastIndex);
const valueAt = (index: number) => String(getFixedValue(rangeValues, index));

test.describe("Given the exercise 2 page with a fixed range of six prices", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(EXERCISES.fixed.href);
  });

  test.describe("When it loads", () => {
    test("Then the handles should select the first and the last prices from the mocked service", async ({
      page,
    }) => {
      const range = createRangePage(page);

      await expect(range.getThumb("min")).toHaveAttribute("aria-valuenow", valueAt(FIRST_INDEX));
      await expect(range.getThumb("max")).toHaveAttribute("aria-valuenow", valueAt(lastIndex));
    });

    test("Then the prices should be shown as labels that cannot be edited", async ({ page }) => {
      const main = page.getByRole("main");

      await expect(
        main.getByText(formatPrice(getFixedValue(rangeValues, FIRST_INDEX))),
      ).toBeVisible();
      await expect(main.getByRole("button")).toHaveCount(0);
      await expect(main.getByRole("spinbutton")).toHaveCount(0);
    });
  });

  test.describe("When the min handle is dragged between the second and the third price", () => {
    test("Then it should snap to the closest price, the third one", async ({ page }) => {
      const range = createRangePage(page);
      const pointerPercent = (percentOfIndex(1) + percentOfIndex(2) * 3) / 4;

      await range.dragThumbTo("min", pointerPercent);

      await expect(range.getThumb("min")).toHaveAttribute("aria-valuenow", valueAt(2));
    });

    test("Then the handle should be placed exactly on the third price", async ({ page }) => {
      const range = createRangePage(page);
      const pointerPercent = (percentOfIndex(1) + percentOfIndex(2) * 3) / 4;

      await range.dragThumbTo("min", pointerPercent);

      await expect.poll(() => range.getThumbPercent("min")).toBeCloseTo(percentOfIndex(2), 0);
    });
  });

  test.describe("When the min handle is dragged beyond the max handle", () => {
    test("Then both handles should share the last price without crossing", async ({ page }) => {
      const range = createRangePage(page);

      await range.dragThumbTo("min", percentOfIndex(lastIndex) * 2);

      await expect(range.getThumb("min")).toHaveAttribute("aria-valuenow", valueAt(lastIndex));
      await expect(range.getThumb("max")).toHaveAttribute("aria-valuenow", valueAt(lastIndex));
    });
  });

  test.describe("When the max handle is focused and the ArrowLeft key is pressed", () => {
    test("Then the max handle should move to the previous price", async ({ page }) => {
      const range = createRangePage(page);

      await range.getThumb("max").focus();
      await page.keyboard.press("ArrowLeft");

      await expect(range.getThumb("max")).toHaveAttribute("aria-valuenow", valueAt(lastIndex - 1));
    });
  });
});
