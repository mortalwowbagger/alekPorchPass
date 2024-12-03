import { Locator, Page } from 'playwright';

export class AllModels {
  private page: Page;
  readonly url: string;
  readonly searchHomesField: Locator;
  readonly results: string;

  constructor(page: Page) {
    this.page = page;
    this.url = 'https://www.braustin.com/shop/all-models'
    this.searchHomesField = page.locator('input[placeholder="Search homes"]');
    this.results = '.text03-b\\.\\!text-clr-cnt-body.truncate.flex-1';
  }

  async getSearchResultsText() {
    const resultsText = await this.page.locator(this.results).allTextContents();
    return resultsText;  // Return text contents of all matching search result elements
  }

  async getCurrentUrl() {
    return this.page.url(); // Get the current URL
  }

  async inputSearchText(text: string) {
    await this.searchHomesField.nth(1).fill(text);  // Use fill to input text
  }

  async searchResults() {
    const results = await this.page.locator(this.results)
    return results
  }

  // Method to check if any result contains a partial match
  async checkResultsForPartialMatch(searchText: string): Promise<boolean> {
    const resultCount = await this.searchResults().count();
    for (let i = 0; i < resultCount; i++) {
      const resultText = await this.results.nth(i).textContent(); // Get text content of each result
      if (resultText && resultText.includes(searchText)) { // Check for partial match
        console.log(`Found partial match: ${resultText}`);
        return true;  // Return true if any result matches
      }
    }
    return false;  // Return false if no matches are found
  }


  // Method to check if all results contain a partial match
  async checkAllResultsForPartialMatch(searchText: string): Promise<boolean> {
    const resultCount = await this.results.count();
    
    // Iterate over each result and check if it contains the partial match
    for (let i = 0; i < resultCount; i++) {
      const resultText = await this.results.nth(i).textContent(); // Get text content of each result
      if (!resultText || !resultText.includes(searchText)) { // If no match, return false
        console.log(`No partial match found in result: ${resultText}`);
        return false;
      }
    }

    // If all results have a partial match, return true
    return true;
  }

  async navigateToHomePage(url: string) {
    await this.page.goto(url);
  }

  async getTitle() {
    return this.page.title();
  }

  // Example of interacting with an element
  async clickButton(selector: string) {
    await this.page.click(selector);
  }
}
