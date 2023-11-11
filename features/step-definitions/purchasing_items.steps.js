const { Given, When, Then } = require('@wdio/cucumber-framework');

Given(/^a user is on the men's jackets page$/, async () => {

	await browser.url('https://magento.softwaretestingboard.com/men/tops-men/jackets-men.html');

});

When(/^the user selects a size of an item$/, async () => {
   const sizeElement = await $$('.swatch-option.text')[0];
   await sizeElement.click();
});

When(/^selects a color$/, async () => {
   const colorElement = await $$('.swatch-option.color')[0];
   await colorElement.click();
});

When(/^presses the Add to Cart button$/, async () => {
   const addToCartButton = $('button[title="Add to Cart"]');
   await addToCartButton.waitForClickable({ timeout: 10000 });
   await addToCartButton.click();
});

Then(/^the item is added to the cart$/, async () => {
   const cartCounterButton = $('.counter-number');

   await browser.waitUntil(async () => {
      const cartCounterText = await cartCounterButton.getText(); // or use other methods to check the content
      return cartCounterText.includes('1'); // Adjust based on your scenario
   }, { timeout: 10000 });

   expect(cartCounterButton).toBeClickable();

   await cartCounterButton.click();
});

Given(/^a user has an item in their cart$/, async () => {
	const totalItemsElement = $('.items-total .count');
   await totalItemsElement.waitForDisplayed({ timeout: 10000 });
   const totalItemsCount = await totalItemsElement.getText();

   expect(totalItemsCount).toEqual('1');
});

When(/^the user edits the quantity of the item$/, async () => {
   const cartQuantityButton = $('.item-qty.cart-item-qty');
	await cartQuantityButton.setValue(2);
   const cartQuantityValue = await cartQuantityButton.getValue();

   expect(cartQuantityValue).toEqual("12");

   const updateButton = $('button[title="Update"]');
   await updateButton.waitForDisplayed({ timeout: 10000 });
   await updateButton.click();
   await updateButton.waitForDisplayed({ reverse: true });
});

When(/^presses the Proceed to Checkout button$/, async () => {
	const checkoutButton = $('#top-cart-btn-checkout');
   await checkoutButton.click();
});

Then(/^the user is directed to the shipping page$/, async () => {
   await $('#shipping').waitForDisplayed({ timeout: 10000 });
   const currentUrl = await browser.getUrl();

   expect(currentUrl).toEqual('https://magento.softwaretestingboard.com/checkout/#shipping');
});

Given(/^the user is on the shipping page$/, async () => {
   const shippingListItem = $('#shipping');
   await shippingListItem.waitForDisplayed({ timeout: 10000 });

   expect(shippingListItem).toBeDisplayed();
});

When(/^they fill in the required inputs$/, async () => {
   
   this.inputs = {};

   this.inputs.email = 'emailthatdoesntexist@gmail.com';
	const emailInput = $('#customer-email');
   await emailInput.setValue(this.inputs.email);

   this.inputs.firstName = 'FirstName';
   const firstNameInput = $('input[name="firstname"]');
   await firstNameInput.setValue(this.inputs.firstName);

   this.inputs.lastName = 'LastName';
   const lastNameInput = $('input[name="lastname"]');
   await lastNameInput.setValue(this.inputs.lastName);

   this.inputs.address = '123 Fake Street';
   const addressInput = $('input[name="street[0]"]');
   await addressInput.setValue(this.inputs.address);

   this.inputs.city = 'City';
   const cityInput = $('input[name="city"]');
   await cityInput.setValue(this.inputs.city);

   this.inputs.state = 'Texas';
   const stateDropdownInput = $('select[name="region_id"]');
   await stateDropdownInput.waitForDisplayed({ timeout: 5000 });
   await stateDropdownInput.selectByVisibleText(this.inputs.state);

   this.inputs.postCode = '12345';
   const postCodeInput = $('input[name="postcode"]');
   await postCodeInput.setValue(this.inputs.postCode);

   this.inputs.country = 'United States';
   const countryDropdown = $('select[name="country_id"]');
   await countryDropdown.waitForDisplayed({ timeout: 5000 });
   await countryDropdown.selectByVisibleText(this.inputs.country);

   this.inputs.phoneNumber = '5124567890';
   const phoneNumberInput = $('input[name="telephone"]');
   await phoneNumberInput.setValue(this.inputs.phoneNumber);

   const radioButton = $$('.radio')[0];
   const shippingMethodElement = $$('.col.col-method')[0];
   const shippingCarrierElement = $$('.col.col-carrier')[0];

   this.inputs.shippingMethod = await shippingMethodElement.getText();
   this.inputs.shippingCarrier = await shippingCarrierElement.getText();

   await radioButton.waitForClickable({ timeout: 5000 });
   await radioButton.click();
   
});

When(/^press the Next button$/, async () => {
   await browser.keys(['Enter']);   
});

Then(/^the user will be directed to the payment page$/, async () => {
	await $('#billing-address-same-as-shipping-checkmo').waitForDisplayed({ timeout: 10000 });
   
   const currentUrl = await browser.getUrl();
   
   expect(currentUrl).toEqual('https://magento.softwaretestingboard.com/checkout/#payment');
});

Given(/^the user is on the payment page$/, async () => {
   const currentUrl = await browser.getUrl();
   
   expect(currentUrl).toEqual('https://magento.softwaretestingboard.com/checkout/#payment');
});

Then(/^the billing information matches the information provided$/, async () => {
	const billingInfoElement = $('.billing-address-details');
   const billingInfoText = await billingInfoElement.getText();

   expect(billingInfoText).toContain(this.inputs.firstName,
                                    this.inputs.lastName,
                                    this.inputs.address,
                                    this.inputs.city,
                                    this.inputs.state,
                                    this.inputs.postCode,
                                    this.inputs.country,
                                    this.inputs.phoneNumber);
   
});

Then(/^the shipping method matches the information provided$/, async () => {
	const shippingElement = $('span[data-bind="text: getShippingMethodTitle()"]');
   const shippingText = await shippingElement.getText();
   
   expect(shippingText).toContain(this.inputs.shippingMethod);
   expect(shippingText).toContain(this.inputs.shippingCarrier);
});

Then(/^the cart matches the items selected$/, async () => {
	const cartQuantityElement = await $('span[data-bind="text: getCartSummaryItemsCount()"]');
   const cartQuantityText = await cartQuantityElement.getText();

   expect(cartQuantityText).toEqual("12");
});

Then(/^the billing address matches the shipping address checkbox is checked$/, async () => {
	const checkboxElement = await $('#billing-address-same-as-shipping-checkmo');
   const checkBoxisSelected = await checkboxElement.isSelected();

   if(checkBoxisSelected) {
      await checkboxElement.click();
      await checkboxElement.click();
   } else {
      await checkboxElement.click();
   };

});

When(/^the user presses the Place Order button$/, async () => {
   await browser.keys(['Tab', 'Tab', 'Enter']);
   await $('div[class="checkout-success"]').waitForDisplayed({ timeout: 10000 });
});

Then(/^they will be directed to the success page$/, async () => {

	const currentUrl = await browser.getUrl();
   
   expect(currentUrl).toEqual('https://magento.softwaretestingboard.com/checkout/onepage/success/');
});
