import { test, expect} from '@playwright/test';
import { Navigation } from '../pages/navigation';

let nav: Navigation;

test.describe('Main Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Initialize the HomePage class and navigate to the URL
    nav = new Navigation(page);
    await page.goto(nav.url);
  });

  test('Navigation links', async ({ page }) => {
    nav = new Navigation(page);
    
    // Homes links
    nav.selectNavOption("Homes", "All Models")
    await expect(page).toHaveURL('https://www.braustin.com/shop/all-models')
    await expect(nav.homesHeading).toBeVisible()

    nav.selectNavOption("Homes", "In Stock")
    await expect(page).toHaveURL('https://www.braustin.com/shop/inventory')
    await expect(nav.homesHeading).toBeVisible()

    nav.selectNavOption("Homes", "On Land")
    await expect(page).toHaveURL('https://www.braustin.com/shop/land-home')
    await expect(nav.homesHeading).toBeVisible()

    nav.selectNavOption("Homes", "On Sale")
    await expect(page).toHaveURL('https://www.braustin.com/shop/homes-on-sale')
    await expect(nav.homesHeading).toBeVisible()

    nav.selectNavOption("Homes", "Saved")
    await expect(page).toHaveURL('https://www.braustin.com/shop/saved-homes')
    await expect(nav.savedHomesHeading).toBeVisible()
    
    // About links
    nav.selectNavOption("About", "Braustin Story")
    await expect(page).toHaveURL('https://www.braustin.com/about')
    await expect(nav.braustinStoryHeading).toBeVisible()

    nav.selectNavOption("About", "Customer Stories")
    await expect(page).toHaveURL('https://www.braustin.com/customer-stories')
    await expect(nav.braustinCustomerStoryHeading).toBeVisible()

    nav.selectNavOption("About", "Locations")
    await expect(page).toHaveURL('https://www.braustin.com/locations')
    await expect(nav.locationsHeading).toBeVisible()

    // Learn Links
    let learn = await nav.getNavOption("Learn")
    learn.hover()
    let blog = await nav.getNavSubOption("Blog")
    await blog.click()
    await expect(page).toHaveURL('https://www.braustin.com/blog')
    await expect(nav.blogHeading).toBeVisible()

    learn.hover()
    let academy = await nav.getNavSubOption("Academy")
    await academy.click()
    await expect(page).toHaveURL('https://www.braustin.com/academy')
    await expect(nav.academyHeading).toBeVisible()

    learn.hover()
    let podcast = await nav.getNavSubOption("Podcast")
    await podcast.click()
    await expect(page).toHaveURL('https://www.braustin.com/podcast')
    await expect(nav.podcastHeading).toBeVisible()

    learn.hover()
    let faq = await nav.getNavSubOption("FAQs")
    await faq.click()
    await expect(page).toHaveURL('https://www.braustin.com/frequently-asked-questions')
    await expect(nav.faqsHeading).toBeVisible()

    learn.hover()
    let braustinScholars = await nav.getNavSubOption("Braustin Scholars")
    await braustinScholars.click()
    await expect(page).toHaveURL('https://www.braustin.com/braustin-scholars')
    await expect(nav.braustingScholarsHeading).toBeVisible()

    // Contact Us
    let contactUs = await nav.getNavOption("Contact Us")
    contactUs.click()
    await expect(page).toHaveURL('https://www.braustin.com/contact-us')
    await expect(nav.contactUsHeading).toBeVisible()

    // Commercial Accounts
    let commercialAccounts = await nav.getNavOption("Commercial Accounts")
    commercialAccounts.click()
    await expect(page).toHaveURL('https://www.braustin.com/commercial-account-management')
    await expect(nav.commercialAccountsHeading).toBeVisible()

    // Skirting
    let skirting = await nav.getNavOption("Skirting")
    skirting.click()
    await expect(page).toHaveURL('https://www.braustin.com/mobile-home-skirting-quote')
    await expect(nav.skirtingHeading).toBeVisible()
  });

})
