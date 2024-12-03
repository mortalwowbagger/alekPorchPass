import { test, expect} from '@playwright/test';
import { HomeAllModels } from '../pages/homeAllModels';

let allModels: HomeAllModels;

test.describe('Home Models Search', () => {
  test.beforeEach(async ({ page }) => {
    // Initialize the all models class and navigate to the URL
    allModels = new HomeAllModels(page);
    await allModels.navigateToSearchPage();
  });

  // Navigate to the Homes: All Models page.
  test('All Models page is available', async ({ page }) => {
    allModels = new HomeAllModels(page);
    await expect(page).toHaveURL(allModels.url);
  });

  // Confirm that the search bar returns houses filtered by name.
  test('Home Models Search should return houses filtered by name', async ({ page }) => {
    allModels = new HomeAllModels(page);

    const searchTerm = 'Oak Creek';
    await allModels.searchModel(searchTerm);

    // Verify that the results contain the search term
    await allModels.verifyModelsContainName(searchTerm);
  });

  // Confirm that an invalid name will not return results.
  // Confirm that clearing the search bar will return all results.
  test('Invalid Search should display No items match your filters', async ({ page }) => {
    allModels = new HomeAllModels(page);

    const searchTerm = 'Invalid Search';
    await allModels.searchModel(searchTerm);

    let resultsNum = await allModels.getNumberOfResults()

    await expect(resultsNum).toBe(0)

    await expect(allModels.noItems).toHaveText('No items match your filters')

    await allModels.searchModel('')
  
    resultsNum = await allModels.getNumberOfResults();

    await expect(resultsNum).toBeGreaterThan(0)
  });

})
