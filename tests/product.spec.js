const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const testData = require('../utils/testData');

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(testData.validUser.username, testData.validUser.password);
});

test('Add and remove product', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await inventory.addItem('sauce-labs-backpack');
  expect(await inventory.getCartCount()).toBe(1);
  await inventory.removeItem('sauce-labs-backpack');
  expect(await inventory.getCartCount()).toBe(0);
});

test('Add most expensive product', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await inventory.addItem('sauce-labs-fleece-jacket');
  expect(await inventory.getCartCount()).toBe(1);
});
