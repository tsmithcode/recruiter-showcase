import { expect, test, type Locator, type Page } from "@playwright/test";

const viewports = [
  { name: "small-phone", width: 375, height: 667 },
  { name: "phone", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 800 },
];

const stableRoutes = [
  "/",
  "/demos",
  "/demos/ajam",
  "/demos/monyawn",
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
      name: /complex operational work is only valuable if other people can trust it quickly/i,
    }),
  ).toBeVisible();
  await expect(page.getByTestId("wizard-progress-label")).toHaveText(/start/i);
  await expect(page.getByTestId("story-wizard")).toBeVisible();

  await page.getByRole("button", { name: /^start$/i }).click();
  await expect(
    page.getByRole("heading", {
      name: /thomas smith is a principal-level workflow and systems builder, not a loose collection of tools/i,
    }),
  ).toBeVisible();
  await page
    .getByRole("button", {
      name: /see the system/i,
    })
    .click();
  await expect(
    page.getByRole("heading", {
      name: /the work spans interface, business rules, retrieval, integration, and proof packaging/i,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: /see the proof/i }).click();
  await expect(
    page.getByTestId("wizard-step-title"),
  ).toBeVisible();
  await expect(
    page.getByText(/the work combines systems thinking, product judgment, and operator empathy/i),
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

test("demo index communicates the seven-product thesis on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/demos");

  await expect(
    page.getByRole("heading", {
      name: /six external products, one showcase, all created from scratch and maintained as one principal-run system/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /open demo proof page/i }).first(),
  ).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("frameable demo page keeps the inline viewer stable on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/demos/ajam");

  await expect(
    page.locator("h1").filter({ hasText: /ajam/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /mobile portrait/i }),
  ).toBeVisible();

  await page.getByRole("button", { name: /mobile landscape/i }).click();
  await expect(
    page.locator('iframe[title="aJam live product"]'),
  ).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("protected demo page renders the fallback shell on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/demos/monyawn");

  await expect(
    page.getByText(/why inline view is unavailable/i),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /open monyawn/i }).first(),
  ).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
