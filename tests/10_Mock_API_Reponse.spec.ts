import { test, expect } from '@playwright/test'

test("Mock API response in Playwright", async ({ page }) => {

    //Mock API response
    await page.route('*/**/api/v1/fruits', async route => {

        const response =await route.fetch();
        const json = await response.json();
        json.push(        
        {
            name: 'playwright typecript by testers talk', id: 12
        });
        json.push({
            name: 'playwright javascript by testers talk', id: 13
        });
        json.push( {
            name: 'cypress by testers talk', id: 14
        });
        json.push( {
            name: 'api testing by testers talk', id: 15
        });

    
        
        await route.fulfill({response, json });
    })

    //Go to URL
    await page.goto('https://demo.playwright.dev/api-mocking/');

    //Validate the texts
    await expect(page.getByText('playwright typecript by testers talk')).toBeVisible();
    await expect(page.getByText('playwright javascript by testers talk')).toBeVisible();
    await expect(page.getByText('cypress by testers talk')).toBeVisible();
    await expect(page.getByText('api testing by testers talk')).toBeVisible();  
});