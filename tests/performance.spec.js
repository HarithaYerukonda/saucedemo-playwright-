const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const testData = require('../utils/testData');

test('Repeat stability check', async ({ page }) => {
  const login = new LoginPage(page);
  for (let i = 0; i < 3; i++) {
    await login.goto();
    await login.login(testData.validUser.username, testData.validUser.password);
    await expect(page).toHaveURL(/inventory.html/);
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
  }
});
