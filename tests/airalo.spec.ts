// @ts-check
import { test, expect } from '@playwright/test';

test('Airalo Japan test', async ({ page }) => {
  await page.goto('https://www.airalo.com/');

  // click accept on cookies popup
  await page.locator('#onetrust-accept-btn-handler').click();

  //Dont allow push notifications
  await page.locator('#wzrk-cancel').click();  

  // click search bar and fill with 'Japan'
  await page.locator('[data-testid="search-input"]').click();

  await page.locator('[data-testid="search-input"]').fill('Japan');

  //Wait for dropdown menu and click on 'Japan'
  
  // await page.locator('.countries-list-segment-container');

  await page.locator ('[data-testid="Japan-name"]').click();

  // Wait for the eSIM packages to load
   
  await page.waitForSelector('[data-testid="esim-button"]');

  // Click the first available eSIM package
  await page.locator('[data-testid="esim-button"]').first().click();

  
  // Verify the details in the popup
  const popupHeader = page.locator('[data-testid="sim-detail-header"]');

  // Ensure the popup is visible
  await expect(popupHeader).toBeVisible();

  // Verify the package details
  await expect(popupHeader.locator('[data-testid="sim-detail-operator-title"] > p')).toHaveText('Moshi Moshi');
  await expect(popupHeader.locator('[data-testid="COVERAGE-value"]')).toHaveText('Japan');
  await expect(popupHeader.locator('[data-testid="DATA-value"]')).toHaveText('1 GB');
  await expect(popupHeader.locator('[data-testid="VALIDITY-value"]')).toContainText('7 Days');
  await expect(popupHeader.locator('[data-testid="PRICE-value"]')).toHaveText('4.50 €');

});
