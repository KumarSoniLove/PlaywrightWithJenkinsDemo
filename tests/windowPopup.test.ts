import {test} from '@playwright/test'

test("windowPopup", async ({page}) => { 

    await page.goto("https://www.testmuai.com/selenium-playground/window-popup-modal-demo/");
    console.log("Current page URL: " + page.url());
    const [newWindow] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator("//a[@title='Follow @testmuai on Twitter']").click()
    ])  
    console.log("New window URL: " + newWindow.url());    
})

test("multiWindowPopups", async ({page}) => {
    // await page.goto("https://www.testmuai.com/selenium-playground/window-popup-modal-demo/");
    // await page.waitForLoadState("load");

    // const [multipage] = await Promise.all([
    //     await page.waitForEvent("popup"),  
    //     await page.getByRole('link', { name: 'Follow Twitter & Facebook' }).click()
        
    // ])
    // const pages = multipage.context().pages();
    // console.log(pages.length);
     await page.goto('https://www.testmuai.com/selenium-playground/window-popup-modal-demo/');
     const page1Promise = page.waitForEvent('popup');
     await page.getByRole('link', { name: 'Follow Twitter & Facebook' }).click();
     const page1 = await page1Promise;
     const tabCount = page.context().pages().length;
     console.log(`Number of open tabs: ${tabCount}`);
     
     let twitter: typeof page;
     for (let i = 0; i < tabCount; i++) {
        const tab = page.context().pages()[i];        
        console.log(`Tab ${i + 1} URL: ${tab.url()}`);     
        if(tab.url()== "https://x.com/testmuai"){
            twitter = tab;
        }
         }            
     const text = await twitter.textContent("//h2[contains(@class,'max-w-full text-headline1')]");
     console.log(text);
        
    

})