import {test, expect} from '@playwright/test'

test("upload", async ({page}) => { 
    await page.goto("https://www.testmuai.com/selenium-playground/upload-file-demo/");    
    // await page.setInputFiles("//input[@type='file']", ["C:/Users/sonil/learn-playwright/uploadFiles/FlowerPNGImage.png"]);

    const [uploadFiles] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.click("//input[@type='file']")
    ]);
    uploadFiles.setFiles(["C:/Users/sonil/learn-playwright/uploadFiles/FlowerPNGImage.png"]);
    
    })