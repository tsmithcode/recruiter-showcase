import { expect, test, type Page } from '@playwright/test';

const viewports = [
  { name: 'phone', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
];

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth - window.innerWidth;
  });

  expect(overflow).toBeLessThanOrEqual(1);
}

for (const viewport of viewports) {
  test(`home is stable on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/');

    await expect(page.getByRole('navigation')).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
}

test('search overlay locks body scroll and stays within viewport on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await page.getByRole('button', { name: /^search$/i }).click();
  await expect(page.getByRole('textbox')).toBeVisible();

  const bodyOverflow = await page.evaluate(() => getComputedStyle(document.body).overflow);
  expect(bodyOverflow).toBe('hidden');

  await expectNoHorizontalOverflow(page);

  await page.getByRole('button', { name: /close search/i }).click();

  const restoredOverflow = await page.evaluate(() => getComputedStyle(document.body).overflow);
  expect(restoredOverflow).not.toBe('hidden');
});

test('cpq mobile manager flow keeps controls visible', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/cpq-demo');

  await page.getByRole('button', { name: /manager/i }).click();
  await expect(page.getByRole('button', { name: /add component/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /edit /i }).first()).toBeVisible();

  await page.getByRole('button', { name: /edit /i }).first().click();
  await expect(page.getByText('Edit Component')).toBeVisible();
  await expect(page.getByRole('button', { name: /close edit component dialog/i })).toBeVisible();
  await expect(page.getByLabel('Name')).toBeVisible();

  await expectNoHorizontalOverflow(page);
});
