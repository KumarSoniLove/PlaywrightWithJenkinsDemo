import {test, expect} from '@playwright/test'

test('javascriptAlertClickme', async ({page}) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");
    page.on("dialog", async (alert) => {
        const text = alert.message();
        console.log(text);
        await alert.accept();
        await page.waitForTimeout(3000);
    })    
    await page.locator("button:has-text('Click Me')").nth(1).click();
    expect(await page.locator("//p[@id='demo']")).toHaveText("You pressed OK!");
})

test('confirmBox', {tag: ['@PlaywrightWithJenkins']}, async ({ page }) => {
  await page.goto('https://www.testmuai.com/selenium-playground/javascript-alert-box-demo/');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
    page.waitForTimeout(5000);
    
  });
  await page.getByRole('paragraph').filter({ hasText: 'Confirm box:Click Me' }).getByRole('button').click();
  await page.waitForTimeout(5000);
   expect(page.locator("#confirm-demo")).toContainText("OK!");
});

test("promptBox", {tag: ['@PlaywrightWithJenkins']}, async ({page}) => {

  await page.goto('https://www.testmuai.com/selenium-playground/javascript-alert-box-demo/');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept('Kumar').catch(() => {});
  
  });
  await page.locator('p').filter({ hasText: 'Prompt box:Click Me' }).getByRole('button').click();
  await
  expect(page.locator("#prompt-demo")).toContainText("'Kumar'");
});

test("handling bootstrap alerts", async ({page}) => {
  
  page.goto("https://www.w3schools.com/bootstrap/bootstrap_modal.asp");
  await page.waitForLoadState('load');
  await page.locator('iframe[title="FastCMP"]').contentFrame().getByRole('button', { name: 'Accept' }).click();
  await page.getByRole('button', { name: 'Click To Open Modal' }).click();

})
// await page.locator('iframe[title="FastCMP"]').contentFrame().getByRole('button', { name: 'Accept' }).click();
  // await page.getByRole('button', { name: 'Click To Open Modal' }).click();