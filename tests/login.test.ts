import { chromium ,test, expect } from '@playwright/test';

const capabilities = {
    browserName: "Chrome", // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    browserVersion: "latest",
    "LT:Options": {
        platform: "Windows 10",
        build: "New Playwright Test Build",
        name: "New Playwright Test",
        user: 'sonieuphoriagooglemail',
        accessKey: 'LT_aozMOyOhRuRE21h7BgoROoNqSfWiHH3Qq07GjHhz63kPhph',
        network: true,
        video: true,
        console: true,
        tunnel: false, // Add tunnel configuration if testing locally hosted webpage
        tunnelName: "", // Optional
        geoLocation: '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
    },
};

test("Login test demo", async () => {
   const browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=
        ${encodeURIComponent(JSON.stringify(capabilities))}`);
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://ecommerce-playground.lambdatest.io/");
   await page.hover("//a[@data-toggle='dropdown'] //span[contains(text(),'My account')]");
//    await page.click("text=Login");
   await page.click("'Login'");
   await page.fill("#input-email","sonieuphoria@googlemail.com");
   await page.fill("#input-password","London24#");
   await page.click("//input[@type='submit']");
   await page.waitForTimeout(3000);
   expect(await page.title()).toBe("My Account");
   await page.close();
   await context.close();
   await browser.close();
//    const newPage = await context.newPage();
   // const newContext = await browser.newContext();
   // const newPage = await newContext.newPage();
   // await newPage.goto("https://ecommerce-playground.lambdatest.io/");
   // await page.waitForSelector("//span[contains(text(),'My account')]");
   // await page.waitForTimeout(5000);

})