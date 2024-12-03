import { test, expect} from '@playwright/test';
import { HomeAllModels } from '../pages/homeAllModels';

let allModels: HomeAllModels;

test.describe('Monthly Payment', () => {
  test.beforeEach(async ({ page }) => {
    // Initialize the HomePage class and navigate to the URL
    allModels = new HomeAllModels(page);
    await allModels.navigateToSearchPage();
  });

  // Navigate to the Homes: All Models page.
  test('Monthly payment changes', async ({ page }) => {
    allModels = new HomeAllModels(page);
    await allModels.modelList.first().click()

    // Credit score
    let estimate1 = await allModels.estimatedMonthyPayment.textContent()
    await page.locator('label.text02-r >> text="Good"').click()
    await page.waitForTimeout(1000)
    let estimate2 = await allModels.estimatedMonthyPayment.textContent()
    await expect(estimate1 != estimate2).toBeTruthy()

    // Downpayment
    // Downpayment percentage
    estimate1 = await allModels.estimatedMonthyPayment.textContent()
    await allModels.downpayment15.click()
    await page.waitForTimeout(1000)
    estimate2 = await allModels.estimatedMonthyPayment.textContent()
    await expect(estimate1 != estimate2).toBeTruthy()

    // Downpayment Input
    estimate1 = await allModels.estimatedMonthyPayment.textContent()
    await allModels.downpaymentInput.clear()
    await allModels.downpaymentInput.fill('15000')
    await page.keyboard.press('Enter')
    await page.waitForTimeout(1000)
    estimate2 = await allModels.estimatedMonthyPayment.textContent()
    await expect(estimate1 != estimate2).toBeTruthy()

    // Zip
    // Invalid Zip
    estimate1 = await allModels.estimatedMonthyPayment.textContent()
    await allModels.deliveryInput.clear()
    await allModels.deliveryInput.fill('12345')
    await page.keyboard.press('Enter')
    await page.waitForTimeout(1000)
    estimate2 = await allModels.estimatedMonthyPayment.textContent()
    await expect(estimate1 == estimate2).toBeTruthy()

    // Valid Zip
    estimate1 = await allModels.estimatedMonthyPayment.textContent()
    await allModels.deliveryInput.clear()
    await allModels.deliveryInput.fill('78640')
    await page.keyboard.press('Enter')
    await page.waitForTimeout(1000)
    estimate2 = await allModels.estimatedMonthyPayment.textContent()
    await expect(estimate1 != estimate2).toBeTruthy()
  });
})
