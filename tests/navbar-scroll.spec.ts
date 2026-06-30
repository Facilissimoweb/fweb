import { test, expect } from '@playwright/test';

test('navbar scroll progress bar updates on scroll', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Wait for loader to disappear (memory says ~2.6s total)
  await page.waitForTimeout(3000);

  const progressBar = page.locator('div.fixed.top-0.left-0.w-full.h-\\[3px\\] > div, div.fixed.top-0.left-0.w-full.h-\\[3px\\] > motion\\.div');

  // Initial state (at top, scaleX should be close to 0)
  // Note: Framer motion uses transform: scaleX(...)
  const initialStyle = await progressBar.getAttribute('style');
  console.log('Initial style:', initialStyle);

  // Scroll down
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(500); // Wait for spring animation

  const scrolledStyle = await progressBar.getAttribute('style');
  console.log('Scrolled style:', scrolledStyle);

  expect(scrolledStyle).toContain('scaleX');

  // Verify it changed
  expect(scrolledStyle).not.toBe(initialStyle);
});
