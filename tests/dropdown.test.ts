import {test, expect} from '@playwright/test'

test('dropdown', async ({page}) => {
    await page.goto("https://www.testmuai.com/selenium-playground/");    
    await page.getByText('Select Dropdown List').click();
    const dropdown = page.locator("#select-demo");
    await page.selectOption("#select-demo", {label: "Friday"});
    await page.waitForTimeout(5000);
    await expect(dropdown).toHaveValue("Friday");
})

test("multidropdown", async ({page}) => {
    await page.goto("https://www.testmuai.com/selenium-playground/");
    await page.getByText('Select Dropdown List').click();
    // const dropdown = page.locator("#multi-select");
    await page.selectOption("#multi-select", [{label: "California"}, {value: "Texas"}, {index: 3}]);
    await page.waitForTimeout(5000);
    // await expect(dropdown).toHaveValue("Monday");
})

test("jqueryDropdown", async ({page}) => {
    await page.goto("https://www.testmuai.com/selenium-playground/jquery-dropdown-search-demo/");
    await page.waitForLoadState("load");
    await selectCountry("Australia");
    await selectCountry("India");
    await selectCountry("Hong Kong");
    

    async function selectCountry(country: string) {
        await page.waitForLoadState("load");
        await page.locator("(//span[@class='select2-selection select2-selection--single'])[1]").click();        
        await page.locator("ul#select2-country-results").locator("li", {hasText:country}).click();     

    }
    
})