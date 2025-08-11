class InventoryPage {
    constructor(page) {
      this.page = page;
      this.cartBadge = '.shopping_cart_badge';
      this.cartLink = '.shopping_cart_link';
    }
  
    async addItem(itemName) {
      await this.page.click(`[data-test="add-to-cart-${itemName}"]`);
    }
  
    async removeItem(itemName) {
      await this.page.click(`[data-test="remove-${itemName}"]`);
    }
  
    async getCartCount() {
        const isBadgeVisible = await this.page.locator(this.cartBadge).isVisible({ timeout: 0 });
        if (isBadgeVisible) {
          return parseInt(await this.page.locator(this.cartBadge).textContent());
        }
        return 0;
      //return this.page.isVisible(this.cartBadge) 
       // ? parseInt(await this.page.textContent(this.cartBadge)) 
        //: 0;
    }
  
    async goToCart() {
      await this.page.click(this.cartLink);
    }
  }
  
  module.exports = InventoryPage;
