import { Locator, Page } from 'playwright';

export class Navigation {
  private page: Page;
  readonly url: string;
  readonly navHomes: Locator;
  readonly homesHeading: Locator;
  readonly savedHomesHeading: Locator;
  readonly braustinStoryHeading: Locator;
  readonly braustinCustomerStoryHeading: Locator;
  readonly locationsHeading: Locator;
  readonly blogHeading: Locator;
  readonly academyHeading: Locator;
  readonly podcastHeading: Locator;
  readonly faqsHeading: Locator;
  readonly braustingScholarsHeading: Locator;
  readonly contactUsHeading: Locator;
  readonly commercialAccountsHeading: Locator;
  readonly skirtingHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = 'https://www.braustin.com/';
    this.navHomes = page.locator('#main-navigation > ul > li > div')
    this.homesHeading = page.locator('h1:has-text("Shop mobile homes in Texas, Oklahoma, New Mexico")')
    this.savedHomesHeading = page.locator('h1:has-text("Shop mobile homes in Texas")')
    this.braustinStoryHeading = page.locator('h1:has-text("The Braustin Story")')
    this.braustinCustomerStoryHeading = page.locator('h1:has-text("Customer Stories")')
    this.locationsHeading = page.locator('h1:has-text("Braustin Homes Dealership Locations")')
    this.blogHeading = page.locator('h2:has-text("All Posts")')
    this.academyHeading = page.locator('h1:has-text("Welcome to Braustin Academy")')
    this.podcastHeading = page.locator('h2:has-text("Top Episodes")')
    this.faqsHeading = page.locator('h2:has-text("FAQs")')
    this.braustingScholarsHeading = page.locator('h1:has-text("Braustin Scholars")')
    this.contactUsHeading = page.locator('h1:has-text("Contact Us")')
    this.commercialAccountsHeading = page.locator('h1:has-text("Commercial Account Management")')
    this.skirtingHeading = page.locator('h1:has-text("Mobile Home Skirting")')
  }
  
  async getNavOption(title: string) {
    const selector = `.text02-r:has-text("${title}")`
    // Wait for the element to be visible and return it
    return await this.page.locator(selector);
  }

  async getNavSubOption(title: string) {
    const selector = `#main-navigation > ul > li > ul > li > a:has-text("${title}")`;

    // Wait for the element to be visible and return it
    return await this.page.locator(selector);
  }

  async selectNavOption(title: string, option: string) {
    let navUpper = await this.getNavOption(title)
    navUpper.hover()
    let navLower = await this.getNavSubOption(option)
    await navLower.click()
  }

}
