import { test, expect, Page, Browser } from '@playwright/test';
import { HomeAllModels } from '../pages/homeAllModels';

let homeModelsPage: HomeAllModels;

test.describe('Home Models filter', () => {
  // This will run once before all tests in the block
  test.beforeEach(async ({ page }) => {
    // Initialize the all models class and navigate to the URL
    homeModelsPage = new HomeAllModels(page);
    await homeModelsPage.navigateToSearchPage();
  });

  // Navigate to the Homes: All Models page.
  test('Home Filters section is available', async ({ page }) => {
    homeModelsPage = new HomeAllModels(page);
    await expect(homeModelsPage.filterHeading).toBeVisible();
  });

  test('Home Filters change results', async ({ page }) => {
    homeModelsPage = new HomeAllModels(page);
    // Sections filter
    let resultsNum1 = await homeModelsPage.getNumberOfResults()
    await homeModelsPage.clickFilterOption("Sections", "Single")
    await page.waitForTimeout(1000); 
    let resultsNum2 = await homeModelsPage.getNumberOfResults()
    await expect(resultsNum1 != resultsNum2).toBeTruthy()
    await homeModelsPage.filterReset.click()

    // Bedrooms filter
    resultsNum1 = await homeModelsPage.getNumberOfResults()
    await homeModelsPage.clickFilterOption("Bedrooms", "1")
    await page.waitForTimeout(1000); 
    resultsNum2 = await homeModelsPage.getNumberOfResults()
    await expect(resultsNum1 != resultsNum2).toBeTruthy()
    await homeModelsPage.filterReset.click()

    // Baths filter
    resultsNum1 = await homeModelsPage.getNumberOfResults()
    await homeModelsPage.clickFilterOption("Baths", "3")
    await page.waitForTimeout(1000); 
    resultsNum2 = await homeModelsPage.getNumberOfResults()
    await expect(resultsNum1 != resultsNum2).toBeTruthy()
    await homeModelsPage.filterReset.click()
    
    // Estimated Payment
    resultsNum1 = await homeModelsPage.getNumberOfResults()
    await homeModelsPage.estimatedPaymentFrom.click()
    await homeModelsPage.dropdownSelection.nth(2).click()
    await homeModelsPage.estimatedPaymentFrom.click()
    await page.waitForTimeout(1000); 
    resultsNum2 = await homeModelsPage.getNumberOfResults()
    await expect(resultsNum1 != resultsNum2).toBeTruthy()
    await homeModelsPage.filterReset.click()

    // Size
    resultsNum1 = await homeModelsPage.getNumberOfResults()
    await homeModelsPage.sizeFrom.click()
    await homeModelsPage.dropdownSelection.nth(4).click()
    await homeModelsPage.sizeFrom.click()
    await page.waitForTimeout(1000);
    resultsNum2 = await homeModelsPage.getNumberOfResults()
    await expect(resultsNum1 != resultsNum2).toBeTruthy()
    await homeModelsPage.filterReset.click()

    // Dimensions
    resultsNum1 = await homeModelsPage.getNumberOfResults()
    await homeModelsPage.dimensionsMaxWidth.click()
    await homeModelsPage.dropdownSelection.nth(6).click()
    await homeModelsPage.dimensionsMaxWidth.click()
    await page.waitForTimeout(1000); 
    resultsNum2 = await homeModelsPage.getNumberOfResults()
    await expect(resultsNum1 != resultsNum2).toBeTruthy()
    await homeModelsPage.filterReset.click()

    // Manufacturer filter
    resultsNum1 = await homeModelsPage.getNumberOfResults()
    await page.locator('a.text02-r:has-text("TRU")').click()
    // await homeModelsPage.clickFilterOption("Manufacturer", "TRU")
    await page.waitForTimeout(1000); 
    resultsNum2 = await homeModelsPage.getNumberOfResults()
    await expect(resultsNum1 != resultsNum2).toBeTruthy()
    await homeModelsPage.filterReset.click()
  });

  // Filter displays no results.
  test('Home Filters displays no results message', async ({ page }) => {
    homeModelsPage = new HomeAllModels(page);
    // Bedrooms filter
    await homeModelsPage.clickFilterOption("Bedrooms", "1")
    await page.waitForTimeout(1000); 
    // Baths filter
    await homeModelsPage.clickFilterOption("Baths", "3")
    await page.waitForTimeout(1000); 
    await expect(homeModelsPage.noItems).toBeVisible()
  });

  // Functionality covered in other tests
  test('Reset Filters button resets filters', async ({ page }) => {
    homeModelsPage = new HomeAllModels(page);
    // Sections filter
    await homeModelsPage.clickFilterOption("Sections", "Single")
    await page.waitForTimeout(1000); 
    let resultsNum1 = await homeModelsPage.getNumberOfResults()
    await homeModelsPage.filterReset.click()
    await page.waitForTimeout(1000); 
    let resultsNum2 = await homeModelsPage.getNumberOfResults()
    await expect(resultsNum1 != resultsNum2).toBeTruthy()
  });
})
