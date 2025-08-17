Feature: User Registration

  Background:
    Given I am on the registration page

  Scenario: Successful registration with valid details and correct OTP
    When I enter a valid first name "Sukhad"
    And I enter a valid last name "Shrestha"
    And I enter a unique email address
    And I enter a valid phone number "+9779841123123"
    And I enter a valid password "P@ssword321"
    And I confirm the password "P@ssword321"
    And I enter a company name "Test Company"
    And I agree to the terms and conditions
    And I submit the registration form
    Then I should be redirected to the OTP page
    When I enter OTP "123456"
    Then I should see a confirmation message "User successfully registered. Please login to continue"

  Scenario: Registration with already registered email
    When I enter a valid first name "Sukhad"
    And I enter a valid last name "Shrestha"
    And I enter an already registered email "sukhadshresthax13@gmail.com"
    And I enter a valid phone number "+9779841123123"
    And I enter a valid password "P@ssword321"
    And I confirm the password "P@ssword321"
    And I enter a company name "Test Company"
    And I agree to the terms and conditions
    And I submit the registration form
    Then I should see an error message "User already exists"

  Scenario: Registration with mismatched passwords
    When I enter a valid first name "Sukhad"
    And I enter a valid last name "Shrestha"
    And I enter an already registered email "sukhadshresthax13@gmail.com"
    And I enter a valid phone number "+9779841123123"
    And I enter a valid password "P@ssword321"
    And I confirm the password "Password#123"
    And I enter a company name "Test Company"
    And I agree to the terms and conditions
    And I submit the registration form
    Then I should see an error message "The retype password must match password."

  Scenario: Registration without agreeing to terms
    When I enter a valid first name "Sukhad"
    And I enter a valid last name "Shrestha"
    And I enter an already registered email "sukhadshresthax13@gmail.com"
    And I enter a valid phone number "+9779841123123"
    And I enter a valid password "P@ssword321"
    And I confirm the password "P@ssword321"
    And I enter a company name "Test Company"
    And I submit the registration form
    Then I should see an error message "You must agree to the Terms of Service"

  Scenario: Registration with valid details but invalid OTP
    When I enter a valid first name "Sukhad"
    And I enter a valid last name "Shrestha"
    And I enter a unique email address
    And I enter a valid phone number "+9779841123123"
    And I enter a valid password "P@ssword321"
    And I confirm the password "P@ssword321"
    And I enter a company name "Test Company"
    And I agree to the terms and conditions
    And I submit the registration form
    Then I should be redirected to the OTP page
    When I enter OTP "000000"
    Then I should see a error message "Invalid verification code provided, please try again."

  Scenario: Registration with Google account
    When I navigate to login page
    And I select Continue with Google
    Then I should be redirected to Google sign in page
    When I enter my google email
    And I click on next
    Then I should be redirected to Google password page
    When I enter my google password
    And I click on next
    Then I should be redirected to Profile completion page
    When I enter a company name "Test Company"
    And I enter a valid phone number "+9779841123123"
    And I submit the form
    Then I should see a confirmation message "User successfully logged in"