import { Page, Locator } from 'playwright';
import { expect } from 'playwright/test';

export class HomeAllModels {
  readonly page: Page;
  readonly url: string;
  readonly searchBar: Locator;
  readonly modelList: Locator;
  readonly noItems: Locator;
  readonly filterHeading: Locator;
  readonly filterReset: Locator;
  readonly estimatedPaymentFrom: Locator;
  readonly dropdownSelection: Locator;
  readonly sizeFrom: Locator;
  readonly dimensionsMaxWidth: Locator;
  readonly estimatedMonthyPayment: Locator;
  readonly downpayment15: Locator;
  readonly downpaymentInput: Locator;
  readonly deliveryInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = 'https://www.braustin.com/shop/all-models';
    this.searchBar = page.locator('input[placeholder="Search homes"]').nth(1); // Search bar input
    this.modelList = page.locator('.homecard.self-start'); // Container that holds the list of models (adjust the selector)
    this.noItems = page.locator('span.text06-b.text-clr-cnt-accent')
    this.filterHeading = page.locator('h2:has-text("Home Filters")')
    this.filterReset = page.locator(`a:has-text("Reset Filters")`).nth(1)
    this.estimatedPaymentFrom = page.locator('button[aria-controls="select-dropdown"]').nth(2)
    this.dropdownSelection = page.locator('#select-dropdown li:nth-child(3) > a')
    this.sizeFrom = page.locator('button[aria-controls="select-dropdown"]').nth(4)
    this.dimensionsMaxWidth = page.locator('button[aria-controls="select-dropdown"]').nth(6)
    this.estimatedMonthyPayment = page.locator('#content main section .grid .flex.justify-between.items-center.bg-clr-srf-bg-secondary .text-clr-cnt-accent').first()
    this.downpayment15 = page.locator('label:has-text("15%")')
    this.downpaymentInput = page.locator('input.flex-1').first()
    this.deliveryInput = page.locator('input.flex-1').nth(1)
  }
  
  async navigateToSearchPage() {
    await this.page.goto('https://www.braustin.com/shop/all-models'); // Replace with the actual URL you want to test
  }

  // Method to perform a search
  async searchModel(name: string) {
    await this.searchBar.click()
    await this.searchBar.fill(name);
    await this.searchBar.press('Enter'); // Ensure to press enter if needed
  }

  // Method to verify if the models listed contain the search term
  async verifyModelsContainName(name: string) {
    const models = await this.modelList;
    const count = await models.count();
  
    for (let i = 0; i < count; i++) {
      const modelName = await models.nth(i).locator('.text03-b').textContent();
      expect(modelName?.toLowerCase()).toContain(name.toLowerCase());
    }
  }

  async getNumberOfResults() {
    const results = await this.modelList
    const count = await results.count(); // Returns the number of matching elements
    return count;
  }

  async getFilterOption(title: string, option: string) {
    // Get filter option
    const selector = `#content > main > div.flex > aside > section:nth-child(3) > div:nth-child(3) > div:has-text("${title}") > div.flex > a:has-text("${option}")`;

    // Wait for the element to be visible and return it
    return await this.page.locator(selector);
  }

  async clickFilterOption(section: string, option: string): Promise<void> {
    const filterOption = await this.getFilterOption(section, option)
    await filterOption.click();
  }
}
