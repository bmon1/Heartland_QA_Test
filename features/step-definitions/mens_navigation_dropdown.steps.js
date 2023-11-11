const { Given, When, Then } = require('@wdio/cucumber-framework');

Given(/^a user is on the home page$/, async () => {
	await browser.url('https://magento.softwaretestingboard.com/');
});

When(/^the user hovers over the (.*) dropdown menu$/, async (firstLevelDropdownButton) => {
   await $(firstLevelDropdownButton).moveTo();
});

When(/^the user hovers over the (.*) list item$/, async (secondLevelDropdownButton) => {
   await $(secondLevelDropdownButton).moveTo();
});

When(/^clicks the (.*) list item$/, async (thirdLevelDropdownButton) => {
	await $(thirdLevelDropdownButton).click();
});

Then(/^the user is navigated to (.*)$/, async (correctPage) => {
   await expect(browser).toHaveUrl(correctPage);
});

