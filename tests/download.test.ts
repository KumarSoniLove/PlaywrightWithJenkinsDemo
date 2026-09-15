import {test, expect} from '@playwright/test'

test('download', async ({page}) => {
    await page.goto("https://www.testmuai.com/selenium-playground/generate-file-to-download-demo/");
    await page.waitForLoadState("load");    
    await page.context().clearCookies();
    await page.click("#textbox");
    await page.type("#textbox", "Hello World");    ;
    const cookiesPopUp = page.locator("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll");
    await cookiesPopUp.isVisible();
    if (await cookiesPopUp.isVisible()) {
        await cookiesPopUp.click();
    }   
    const generateFile = page.locator("//button[normalize-space(text())='Generate File']");
    await generateFile.isEnabled();     
    await generateFile.click();
    await page.waitForTimeout(2000); 
    const download = await Promise.all([
        page.waitForEvent('download'),
        page.click("#link-to-download")
    ])   

    const path = await download[0].suggestedFilename();
    await download[0].saveAs(path);
    
})