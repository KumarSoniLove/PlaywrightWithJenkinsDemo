import {test, expect} from '@playwright/test'
import moment from 'moment'

test('calendar', async ({page}) => {
    await page.goto("https://coreui.io/bootstrap/docs/forms/date-picker/");
    await page.locator("(//input[@class='date-picker-input'])[1]").click();   

await selectDate(15, "July 2026");
async function selectDate(date: number, dateToSelect: string) {
    
        // let dateToSelect = "July 2026";
        const mmyy = page.locator("(//div[@class='calendar-nav-date'])[1]");    
        const prev = page.locator("(//button[@aria-label='Previous month']//span)[1]");
        const next = page.locator("(//button[@aria-label='Next month']//span)[1]");
    
        
        // await page.click("(//td[@class='calendar-cell current']//div)[4]")
    
        const currentMonthYear = (await mmyy.innerText()).trim();
        console.log(`Current: "${currentMonthYear}"`);
    
        const thisMonth = moment(dateToSelect, "MMMM YYYY").isBefore();
        console.log(thisMonth);
    
        while(currentMonthYear !== dateToSelect){
            if(thisMonth){
                await prev.click();            
            } else {
                await next.click();            
            }     
            break; 
        }  
        
        await page.getByText(`${date}`, { exact: true }).first().click();
}
    
    await page.waitForTimeout(3000);
    
});