import { expect, test, type Locator, type Page } from "@playwright/test";

const viewports = [
  { name: "small-phone", width: 375, height: 667 },
  { name: "phone", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 800 },
];

const stableRoutes = [
  "/",
  "/contexts/qts-suwanee",
  "/contexts/autodesk-cad",
  "/contexts/openai",
  "/cpq-demo",
  "/tracks/openai",
];

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth - window.innerWidth;
  });

  expect(overflow).toBeLessThanOrEqual(1);
}

async function expectChildrenWithinParent(parent: Locator, children: Locator) {
  const parentBox = await parent.boundingBox();
  expect(parentBox).not.toBeNull();

  const childCount = await children.count();
  for (let index = 0; index < childCount; index += 1) {
    const childBox = await children.nth(index).boundingBox();
    expect(childBox).not.toBeNull();

    if (!parentBox || !childBox) {
      continue;
    }

    expect(childBox.x).toBeGreaterThanOrEqual(parentBox.x - 1);
    expect(childBox.x + childBox.width).toBeLessThanOrEqual(
      parentBox.x + parentBox.width + 1,
    );
  }
}

for (const viewport of viewports) {
  for (const route of stableRoutes) {
    test(`critical route ${route} is stable on ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto(route);
      if (route === "/") {
        await expect(page.getByTestId("story-wizard")).toBeVisible();
      } else {
        await expect(page.getByRole("navigation")).toBeVisible();
      }
      await expectNoHorizontalOverflow(page);
    });
  }
}

test("homepage wizard walks through the review path on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /this guide will walk you through the proof/i,
    }),
  ).toBeVisible();
  await expect(page.getByTestId("wizard-progress-label")).toHaveText(/start/i);
  await expect(page.getByTestId("story-wizard")).toBeVisible();

  await page.getByRole("button", { name: /^start$/i }).click();
  await expect(
    page.getByRole("heading", { name: /what are you here to review\?/i }),
  ).toBeVisible();
  await page
    .getByRole("button", {
      name: /i am reviewing autodesk or cad systems fit/i,
    })
    .click();
  await expect(
    page.getByRole("heading", {
      name: /this path shows engineering workflow depth without making you browse the archive/i,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: /next page/i }).click();
  await expect(
    page.getByRole("heading", { name: /why this path is credible/i }),
  ).toBeVisible();
  await expect(
    page.getByText(/years of autodesk-centered systems work/i),
  ).toBeVisible();

  await expectNoHorizontalOverflow(page);
});

test("search overlay locks body scroll and stays within viewport on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/contexts/qts-suwanee");

  await page.getByRole("button", { name: /^search$/i }).click();
  await expect(page.getByRole("textbox")).toBeVisible();

  const bodyOverflow = await page.evaluate(
    () => getComputedStyle(document.body).overflow,
  );
  expect(bodyOverflow).toBe("hidden");

  await expectNoHorizontalOverflow(page);

  await page.getByRole("button", { name: /close search/i }).click();

  const restoredOverflow = await page.evaluate(
    () => getComputedStyle(document.body).overflow,
  );
  expect(restoredOverflow).not.toBe("hidden");
});

test("cpq guided proof keeps controls visible on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/cpq-demo");

  await expect(
    page.getByRole("heading", { name: /what this proof shows/i }),
  ).toBeVisible();
  await page.getByRole("button", { name: /next page/i }).click();
  await expect(
    page.getByRole("heading", { name: /pricing logic made visible/i }),
  ).toBeVisible();
  await expect(
    page.getByText(/base implementation labor, optional services/i),
  ).toBeVisible();

  await expectNoHorizontalOverflow(page);
});

test("skip link becomes visible and targets the main content landmark", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: /skip to main content/i });
  await expect(skipLink).toBeVisible();

  await skipLink.scrollIntoViewIfNeeded();
  await skipLink.click({ force: true });
  await expect(page.locator("#main-content")).toBeInViewport();
});

test("context story page keeps controls visible on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/contexts/qts-suwanee");

  await expect(
    page.getByRole("heading", { name: /what this page is about/i }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: /next page/i })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("track story page keeps controls visible on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/tracks/openai");

  await expect(
    page.getByRole("heading", { name: /what this track is for/i }),
  ).toBeVisible();
  await page.getByRole("button", { name: /next page/i }).click();
  await expect(
    page.getByRole("heading", { name: /what you should look for/i }),
  ).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
