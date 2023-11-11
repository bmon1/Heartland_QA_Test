
Feature: Men's dropdown navigation

   Scenario Outline: Navigate to the correct page via the men's dropdown menu
      Given a user is on the home page
      When the user hovers over the <levelOne> dropdown menu
      And the user hovers over the <levelTwo> list item
      And clicks the <levelThree> list item
      Then the user is navigated to <correctPage>

      Examples:
         | levelOne | levelTwo  | levelThree | correctPage                                                                            |
         | #ui-id-5 | #ui-id-17 | #ui-id-19  | https://magento.softwaretestingboard.com/men/tops-men/jackets-men.html                 |
         | #ui-id-5 | #ui-id-17 | #ui-id-20  | https://magento.softwaretestingboard.com/men/tops-men/hoodies-and-sweatshirts-men.html |
         | #ui-id-5 | #ui-id-17 | #ui-id-21  | https://magento.softwaretestingboard.com/men/tops-men/tees-men.html                    |
         | #ui-id-5 | #ui-id-17 | #ui-id-22  | https://magento.softwaretestingboard.com/men/tops-men/tanks-men.html                   |
         | #ui-id-5 | #ui-id-18 | #ui-id-23  | https://magento.softwaretestingboard.com/men/bottoms-men/pants-men.html                |
         | #ui-id-5 | #ui-id-18 | #ui-id-24  | https://magento.softwaretestingboard.com/men/bottoms-men/shorts-men.html               |
