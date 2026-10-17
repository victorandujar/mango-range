import { expect, test } from "@playwright/test";
import { EXERCISE_LIST } from "@/config/exercises";
import { ROUTES } from "@/config/routes";
import { SITE_CONFIG } from "@/config/site";
import { UI_TEXTS } from "@/constants/texts";

test.describe("Given the home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.home);
  });

  for (const { href, title, subtitle } of EXERCISE_LIST) {
    test.describe(`When the ${title} card is clicked`, () => {
      test(`Then it should open the ${subtitle} page and mark it in the navigation`, async ({
        page,
      }) => {
        await page
          .getByRole("list", { name: UI_TEXTS.home.exercisesLabel })
          .getByRole("link", { name: new RegExp(title) })
          .click();

        await expect(page).toHaveURL(href);
        await expect(page).toHaveTitle(
          SITE_CONFIG.titleTemplate.replace(SITE_CONFIG.titlePlaceholder, title),
        );
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(subtitle);
        await expect(
          page
            .getByRole("navigation", { name: UI_TEXTS.navigation.label })
            .getByRole("link", { name: title }),
        ).toHaveAttribute("aria-current", "page");
      });
    });
  }
});
