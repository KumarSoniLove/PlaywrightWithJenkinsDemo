import {expect, test} from '@playwright/test'

test("basic interactions", async ({page}) => {
    await page.goto("https://www.testmuai.com/selenium-playground/simple-form-demo/");
    const messageInput = page.locator("input#user-message");
    console.log(await messageInput.getAttribute("placeholder"));
    expect(messageInput).toHaveAttribute("placeholder", "Please enter your Message");    
    console.log("Before filling messageInput" + await messageInput.inputValue())
    await messageInput.fill("Hi Chintu");
    console.log("After filling messageInput" + await messageInput.inputValue())
})

test("sum", async ({page}) => {
    await page.goto("https://www.testmuai.com/selenium-playground/simple-form-demo/");
    const sum = page.locator("//button[contains(text(), 'Get Sum')]");
    const sum1Input = page.locator("input#sum1");
    const sum2Input = page.locator("input#sum2");
    await sum2Input.scrollIntoViewIfNeeded()
    let num1 = 100;
    let num2 = 200;
    await sum1Input.fill(""+ num1);
    await sum2Input.fill(""+ num2);
    await page.waitForTimeout(2000);        
    await sum.click();        
    let expectedResult = num1 + num2;
    const sumResult = page.locator("p#addmessage");
    console.log(await sumResult.textContent()); 
    await expect(sumResult).toHaveText(""+expectedResult);
})

test("checkbox", async ({page}) => {
    await page.goto("https://www.testmuai.com/selenium-playground/checkbox-demo/");
    const checkbox = page.getByText('Click on check box');
    expect(checkbox).not.toBeChecked();
    await checkbox.check();
    expect(checkbox).toBeChecked();
})