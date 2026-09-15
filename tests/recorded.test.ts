import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/');
  await page.hover("//a[@data-toggle='dropdown'] //span[contains(text(),'My account')]");
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'E-Mail Address' }).click();
  await page.getByRole('textbox', { name: 'E-Mail Address' }).fill('sonieuphoria@googlemail.com');
  await page.getByRole('textbox', { name: 'E-Mail Address' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('London24#');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: ' Edit your account' }).click();
  await page.getByRole('textbox', { name: 'First Name *' }).click();
  await page.getByRole('textbox', { name: 'First Name *' }).fill('Play2');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.hover("//a[@data-toggle='dropdown'] //span[contains(text(),'My account')]");
  await page.getByRole('link', { name: 'Logout', exact: true }).click();
});