import { Given, When, Then, context } from "@cucumber/cucumber";
import { expect, Page, chromium, Browser } from "@playwright/test";
const { v4: uuidv4 } = require('uuid');

import * as dotenv from 'dotenv';
dotenv.config();

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

When("I enter a unique email address", async function () {
  const uniqueEmail = `test_${uuidv4().slice(0, 6)}@example.com`;
  console.log(uniqueEmail);
  await page.fill('input[name="email"]', uniqueEmail);
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
  await page.close();
});

Then("I should see an error message {string}", async function (message: string) {
  const bodyText = await page.textContent("body");
  expect(bodyText).toContain(message);
  await page.close();
});

When("I navigate to login page", async function () {
  await page.click('a:has-text("Login")'); // No id or name available for login button
});

When("I select Continue with Google", async function () {
  await page.click('text=Continue with Google');
  page.waitForLoadState("networkidle")
});

Then("I should be redirected to Google sign in page", async function () {
await page.waitForSelector('input[type="email"]', { timeout: 5000 });
const isVisible = await page.isVisible('input[type="email"]');
expect(isVisible).toBe(true);
});

When("I enter my google email", async function () {
  await page.fill('input[name="identifier"]', process.env.GOOGLE_TEST_EMAIL! ); 
});

When("I click on next", async function () {
  await page.click('text=Next');
  page.waitForLoadState("networkidle") 
});

Then("I should be redirected to Google password page", async function () {
await page.waitForSelector('input[type="password"]', { timeout: 5000 });
const isVisible = await page.isVisible('input[type="password"]');
expect(isVisible).toBe(true);
});

When("I enter my google password", async function () {
  await page.fill('input[id="Passwd"]', process.env.GOOGLE_TEST_PASS! );
});

Then("I should be redirected to Profile completion page", async function () {
  const url = this.page.url();
  expect(url).toContain('profile-completion');
});

When("I submit the form", async function () {
  await page.click('text=Submit');
});