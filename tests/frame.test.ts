import {test, expect} from '@playwright/test'

test("iframe", async ({page}) => {
    await page.goto("https://www.testmuai.com/selenium-playground/iframe-demo/");
    const frames = page.frames();
    console.log("Number of frames: " + frames.length);
    // const frame = page.frame("#iFrame1");
    // await frame?.click("//div[normalize-space(text())='Your content.']")
    // await frame?.fill("//div[normalize-space(text())='Your content.']","Hello Chintu");
    // await page.waitForTimeout(5000);
    // await page.locator('iframe').first().contentFrame().getByText('Your content.').click();
    // await page.locator('iframe').first().contentFrame().getByText('Your content.').fill('Your content.Hellow Kumar\n\n');

    const myFrame = page.locator('iframe').first().contentFrame();
    await myFrame.locator("//div[normalize-space(text())='Your content.']").click();
    await myFrame.locator("//div[normalize-space(text())='Your content.']").fill("Your content.Hellow Kumar\n\n"); 

})

test("nested iframe", async ({page}) => {
    await page.goto("https://www.testmuai.com/selenium-playground/nested-frames/");
    const frames = page.frames();
    console.log("Number of frames: " + frames.length);
    const mainBottomFrame = page.locator("frame[name='frame-bottom']");
    const middleFrame = mainBottomFrame.frameLocator("frame[name='frame-middle']");
    console.log(middleFrame);

    })