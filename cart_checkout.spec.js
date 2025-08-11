const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const testData = require('../utils/testData');

test('Complete checkout flow', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.login(testData.validUser.username, testData.validUser.password);
  await inventory.addItem('sauce-labs-backpack');
  await inventory.goToCart();
  await cart.proceedToCheckout();
  await checkout.fillInfo('John', 'Doe', '12345');
  await checkout.finishOrder();
  expect((await checkout.orderConfirmationText()).toLowerCase()).toContain('thank you for your order');
});
