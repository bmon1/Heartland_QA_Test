Feature: Purchasing a quantity of an item

   Scenario: Adding an item to the cart
      Given a user is on the men's jackets page
      When the user selects a size of an item
      And selects a color
      And presses the Add to Cart button
      Then the item is added to the cart

   Scenario: Changing the quantity of the item in the cart
      Given a user has an item in their cart
      When the user edits the quantity of the item
      And presses the Proceed to Checkout button
      Then the user is directed to the shipping page

   Scenario: Filling out shipping information
      Given the user is on the shipping page
      When they fill in the required inputs
      And press the Next button
      Then the user will be directed to the payment page

   Scenario: Checking the payment page for correct information
      Given the user is on the payment page
      And the billing information matches the information provided
      And the shipping method matches the information provided
      And the cart matches the items selected
      And the billing address matches the shipping address checkbox is checked
      When the user presses the Place Order button
      Then they will be directed to the success page
