import type { Locator, Page } from "@playwright/test";
import { PERCENT_LIMITS, RANGE_ACCESSIBLE_LABELS } from "@/components/Range/constants";
import type { Thumb } from "@/components/Range/types";

const getCenter = async (locator: Locator) => {
  const box = await locator.boundingBox();

  if (!box) throw new Error(`Element ${locator} is not visible`);

  return { x: box.x + box.width / 2, y: box.y + box.height / 2, width: box.width };
};

export const createRangePage = (page: Page) => {
  const getThumb = (thumb: Thumb) =>
    page.getByRole("slider", { name: RANGE_ACCESSIBLE_LABELS.thumbs[thumb] });
  const getEditButton = (thumb: Thumb) =>
    page.getByRole("button", { name: RANGE_ACCESSIBLE_LABELS.editButtons[thumb] });
  const getInput = (thumb: Thumb) =>
    page.getByRole("spinbutton", { name: RANGE_ACCESSIBLE_LABELS.inputs[thumb] });
  const getTrack = () => getThumb("min").locator("..");

  const getTrackPointAt = async (percent: number) => {
    const box = await getTrack().boundingBox();

    if (!box) throw new Error("The range track is not visible");

    return {
      x: box.x + (box.width * percent) / PERCENT_LIMITS.max,
      y: box.y + box.height / 2,
    };
  };

  const getThumbPercent = async (thumb: Thumb) => {
    const box = await getTrack().boundingBox();
    const { x } = await getCenter(getThumb(thumb));

    if (!box) throw new Error("The range track is not visible");

    return ((x - box.x) / box.width) * PERCENT_LIMITS.max;
  };

  const pressThumb = async (thumb: Thumb) => {
    const { x, y } = await getCenter(getThumb(thumb));

    await page.mouse.move(x, y);
    await page.mouse.down();
  };

  const dragThumbTo = async (thumb: Thumb, percent: number) => {
    await pressThumb(thumb);

    const target = await getTrackPointAt(percent);

    await page.mouse.move(target.x, target.y, { steps: 10 });
    await page.mouse.up();
  };

  const editLabel = async (thumb: Thumb, text: string) => {
    await getEditButton(thumb).click();
    await getInput(thumb).fill(text);
    await getInput(thumb).press("Enter");
  };

  return {
    getThumb,
    getEditButton,
    getInput,
    getThumbWidth: async (thumb: Thumb) => (await getCenter(getThumb(thumb))).width,
    getThumbPercent,
    pressThumb,
    dragThumbTo,
    editLabel,
  };
};
