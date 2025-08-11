const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const testData = require('../utils/testData');

test('Unauthorized access redirects to login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('Logout ends session', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(testData.validUser.username, testData.validUser.password);
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});
