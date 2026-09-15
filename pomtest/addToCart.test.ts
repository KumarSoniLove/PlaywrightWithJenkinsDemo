// import {test,expect } from '@playwright/test';
import {test, expect} from '../base/pomfixture';
import * as data from '../test-data/test-data.json';
import RegisterPage from '../pages/registerPage';
import LoginPage from '../pages/loginPage';
import HomePage from '../pages/homePage';


// const email = "sonieuphoria06@googlemail.com";
// const password = "London26#";

test.describe("Page object test demo", () => {
    
 test.describe.configure({ mode: 'serial' });

test("Register test_01", async ({page,baseURL, registerPage}) => {

    // const register = new RegisterPage(page);  
    await page.goto(`${baseURL}route=account/register`);
    await registerPage.enterFirstName(data.firstname);
    await registerPage.enterLastName(data.lastname);    
    await registerPage.enterEmail(data.email);
    await registerPage.enterTelephone(data.phoneNumber);
    await registerPage.enterPassword(data.password);
    await registerPage.enterConfirmPassword(data.password);
    expect((await registerPage.isSubscribeChecked()).isChecked()).toBeTruthy();
    await registerPage.clickTermandCondition();
    await registerPage.continueToRegister();    
})

test("Login to test_02", async ({page,baseURL, loginPage}) => {
    // const login = new LoginPage(page);
    await page.goto(`${baseURL}route=account/login`);
    await loginPage.enterEmail(data.email);
    await loginPage.enterLoginPassword(data.password);
    await loginPage.clickLoginBtn();
    await page.waitForLoadState("networkidle");
    expect(await page.title()).toBe("My Account");
    
})

test("Add to cart_03", async ({page,baseURL, loginPage, homePage}) => {
    // const login = new LoginPage(page);
    await page.goto(`${baseURL}route=account/login`);
    await loginPage.login(data.email,data.password);
    await page.waitForLoadState("load");
    // const home = new HomePage(page);
    await homePage.clickOnHome();
    await page.getByAltText('Laptops').scrollIntoViewIfNeeded();
    await page.waitForTimeout(5000);
    await homePage.chooseLaptops();
    await page.waitForTimeout(3000);
    await homePage.chooseHTCProduct();  
    await page.waitForTimeout(3000);
    await homePage.addFirstProductToCart();
    const toast = await homePage.isToastVisible()
    expect(toast).toBeVisible();    
    
})
})