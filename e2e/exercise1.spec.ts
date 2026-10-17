import { expect, test } from "@playwright/test";
import { valueToPercent } from "@/components/Range/utils/position";
import { EXERCISES } from "@/config/exercises";
import { normalRangeMock } from "@/mocks/range";
import { formatPrice } from "./support/formatPrice";
import { createRangePage } from "./support/rangePage";

const { min, max } = normalRangeMock;
const percentOf = (value: number) => valueToPercent(value, min, max);

test.describe("Given the exercise 1 page with a normal range from 1 to 100", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(EXERCISES.normal.href);
  });

  test.describe("When it loads", () => {
    test("Then the min and max values should be the ones provided by the mocked service", async ({
      page,
    }) => {
      const range = createRangePage(page);

      await expect(range.getThumb("min")).toHaveAttribute("aria-valuenow", String(min));
      await expect(range.getThumb("max")).toHaveAttribute("aria-valuenow", String(max));
      await expect(range.getEditButton("min")).toHaveText(formatPrice(min));
      await expect(range.getEditButton("max")).toHaveText(formatPrice(max));
    });

    test("Then it should not use an HTML range input", async ({ page }) => {
      await expect(page.locator('input[type="range"]')).toHaveCount(0);
    });
  });

  test.describe("When the pointer hovers the min handle", () => {
    test("Then the handle should enlarge and the cursor should show it can be grabbed", async ({
      page,
    }) => {
      const range = createRangePage(page);
      const initialWidth = await range.getThumbWidth("min");

      await range.getThumb("min").hover();

      await expect.poll(() => range.getThumbWidth("min")).toBeGreaterThan(initialWidth);
      await expect(range.getThumb("min")).toHaveCSS("cursor", "grab");
    });
  });

  test.describe("When the min handle is pressed", () => {
    test("Then the cursor should show that the handle is being dragged", async ({ page }) => {
      const range = createRangePage(page);

      await range.pressThumb("min");

      await expect(range.getThumb("min")).toHaveCSS("cursor", "grabbing");
    });
  });

  test.describe("When the min handle is dragged to the position of the value 50", () => {
    test("Then the min value should be 50 and its label should show it as a price", async ({
      page,
    }) => {
      const range = createRangePage(page);

      await range.dragThumbTo("min", percentOf(50));

      await expect(range.getThumb("min")).toHaveAttribute("aria-valuenow", "50");
      await expect(range.getEditButton("min")).toHaveText(formatPrice(50));
    });
  });

  test.describe("When the max handle is dragged to 40 and the min handle is dragged past it", () => {
    test("Then the min handle should stop at 40 without crossing the max handle", async ({
      page,
    }) => {
      const range = createRangePage(page);

      await range.dragThumbTo("max", percentOf(40));
      await range.dragThumbTo("min", percentOf(90));

      await expect(range.getThumb("min")).toHaveAttribute("aria-valuenow", "40");
      await expect(range.getThumb("max")).toHaveAttribute("aria-valuenow", "40");
    });
  });

  test.describe("When the max handle is dragged beyond the end of the track", () => {
    test("Then the max value should never be greater than 100", async ({ page }) => {
      const range = createRangePage(page);

      await range.dragThumbTo("max", percentOf(50));
      await range.dragThumbTo("max", percentOf(500));

      await expect(range.getThumb("max")).toHaveAttribute("aria-valuenow", String(max));
    });
  });

  test.describe("When the min label is clicked and the value 30 is typed", () => {
    test("Then the min value should be 30 and the handle should move to its position", async ({
      page,
    }) => {
      const range = createRangePage(page);

      await range.editLabel("min", "30");

      await expect(range.getThumb("min")).toHaveAttribute("aria-valuenow", "30");
      await expect(range.getEditButton("min")).toHaveText(formatPrice(30));
      expect(await range.getThumbPercent("min")).toBeCloseTo(percentOf(30), 0);
    });
  });

  test.describe("When the max label is clicked and a value above the range, 500, is typed", () => {
    test("Then the max value should stay at the maximum of the range, 100", async ({ page }) => {
      const range = createRangePage(page);

      await range.editLabel("max", "500");

      await expect(range.getThumb("max")).toHaveAttribute("aria-valuenow", String(max));
    });
  });

  test.describe("When the min label is clicked, 30 is typed and Escape is pressed", () => {
    test("Then the min value should not change", async ({ page }) => {
      const range = createRangePage(page);

      await range.getEditButton("min").click();
      await range.getInput("min").fill("30");
      await range.getInput("min").press("Escape");

      await expect(range.getThumb("min")).toHaveAttribute("aria-valuenow", String(min));
    });
  });

  test.describe("When the min handle is focused and the ArrowRight key is pressed", () => {
    test("Then the min value should increase one step, to 2", async ({ page }) => {
      const range = createRangePage(page);

      await range.getThumb("min").focus();
      await page.keyboard.press("ArrowRight");

      await expect(range.getThumb("min")).toHaveAttribute("aria-valuenow", "2");
    });
  });
});
