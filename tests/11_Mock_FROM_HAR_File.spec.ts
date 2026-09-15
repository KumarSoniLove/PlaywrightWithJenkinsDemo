import { test, expect } from '@playwright/test'

test("Mock API from HAR file in Playwright", async ({ page }) => {

    //Recording a HAR file
    await page.routeFromHAR('./har/fruits.har', {

        url: '*/**/api/v1/fruits',
        update: false
    })

    //Go to URL
    await page.goto('https://demo.playwright.dev/api-mocking/');

    //Validate the texts
    await expect(page.getByText('Strawberry')).toBeVisible();
    await expect(page.getByText('Playwright typescript by testers talk')).toBeVisible();
    await expect(page.getByText('Playwright javascript by testers talk')).toBeVisible();
    await expect(page.getByText('Cypress by testers talk')).toBeVisible();
    await expect(page.getByText('api testing by testers talk')).toBeVisible();


});