class CheckoutPage {
    constructor(page) {
      this.page = page;
      this.firstName = '[data-test="firstName"]';
      this.lastName = '[data-test="lastName"]';
      this.postalCode = '[data-test="postalCode"]';
      this.continueBtn = '[data-test="continue"]';
      this.finishBtn = '[data-test="finish"]';
      this.completeHeader = '.complete-header';
    }
  
    async fillInfo(first, last, zip) {
      await this.page.fill(this.firstName, first);
      await this.page.fill(this.lastName, last);
      await this.page.fill(this.postalCode, zip);
      await this.page.click(this.continueBtn);
    }
  
    async finishOrder() {
      await this.page.click(this.finishBtn);
    }
  
    async orderConfirmationText() {
      return this.page.textContent(this.completeHeader);
    }
  }
  
  module.exports = CheckoutPage;
