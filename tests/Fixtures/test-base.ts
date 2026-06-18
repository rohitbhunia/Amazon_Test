import { test as base } from '@playwright/test';
import { SearchResultsPage } from '../pages/search-results.page';
import { HomePage } from '../pages/home.page';

type MyFixtures = {
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page)); 
  },
  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },
});

export { expect } from '@playwright/test';
