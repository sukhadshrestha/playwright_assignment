import { Given, When, Then } from "@cucumber/cucumber";
import { expect, Page, chromium, Browser } from "@playwright/test";

let browser: Browser;
let page: Page;

Given("I am on the registration page", {timeout:20000}, async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto("https://dev.docs.ink/register");
});

When("I enter a valid first name {string}", async function (firstName: string) {
  await page.fill('input[name="first_name"]', firstName);
});

When("I enter a valid last name {string}", async function (lastName: string) {
  await page.fill('input[name="last_name"]', lastName);
});

When("I enter a unique email address {string}", async function (email:string) {
  await page.fill('input[name="email"]', email);
});

When("I enter an already registered email {string}", async function (email: string) {
  await page.fill('input[name="email"]', email);
});

When("I enter a valid phone number {string}", async function (phone: string) {
  await page.fill('input[name="phoneNumber"]', phone);
});

When("I enter a valid password {string}", async function (password: string) {
  await page.fill('input[name="password"]', password);
});

When("I confirm the password {string}", async function (password: string) {
  await page.fill('input[name="confirmPassword"]', password); 
});

When("I enter a company name {string}", async function (companyName: string) {
  await page.fill('input[name="company_name"]', companyName);
});

When("I agree to the terms and conditions", async function () {
  await page.click('button[id="checkbox-tos"]');
});

When("I submit the registration form", async function () {
  await Promise.all([
    page.click('button[id="register-button-1"]'),
    page.waitForLoadState("networkidle")
  ]);
});

Then("I should be redirected to the OTP page", async function () {
  const bodyText = await page.textContent("body");
  expect(bodyText).toContain("Confirm Registration");
});

When("I enter OTP {string}", async function (otp: string) {
  await page.fill('input[id="otp-input"]', otp);
});

Then("I should see a confirmation message {string}", async function (message: string) {
  const bodyText = await page.textContent("body");
  expect(bodyText).toContain(message);
  await browser.close();
});

Then("I should see an error message {string}", async function (message: string) {
  const bodyText = await page.textContent("body");
  expect(bodyText).toContain(message);
  await browser.close();
});
