class CartPage {
    constructor(page) {
      this.page = page;
      this.checkoutBtn = '[data-test="checkout"]';
    }
  
    async proceedToCheckout() {
      await this.page.click(this.checkoutBtn);
    }
  }
  
  module.exports = CartPage;
