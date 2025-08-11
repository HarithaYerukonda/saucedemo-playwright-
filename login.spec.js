const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const testData = require('../utils/testData');

test.describe('Login Scenarios', () => {
  test('Valid login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(testData.validUser.username, testData.validUser.password);
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Invalid login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(testData.invalidUser.username, testData.invalidUser.password);
    await expect(await login.getErrorMessage()).toContain('Username and password do not match');
  });

  test('Locked out user', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(testData.lockedOutUser.username, testData.lockedOutUser.password);
    await expect(await login.getErrorMessage()).toContain('locked out');
  });

  test('Problem user login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(testData.problemUser.username, testData.problemUser.password);
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Performance glitch user', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    const start = Date.now();
    await login.login(testData.performanceUser.username, testData.performanceUser.password);
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(8000); // adjust threshold
  });
});
