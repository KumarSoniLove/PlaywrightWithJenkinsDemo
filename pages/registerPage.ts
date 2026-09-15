import { Page } from "@playwright/test";

export default class RegisterPage {

    constructor(public page: Page){

    }

    async enterFirstName(firstName: string){
        await this.page.locator("#input-firstname").fill(firstName);
    }

    async enterLastName(lastName: string){
        await this.page.locator("#input-lastname").fill(lastName);
    }

    async enterEmail(email: string){
        await this.page.locator("#input-email").fill(email);
    }

    async enterTelephone(phone: string){
        await this.page.locator("#input-telephone").fill(phone);
    }

    async enterPassword(password: string){
        await this.page.locator("#input-password").fill(password);
    }

    async enterConfirmPassword(password: string){
        await this.page.locator("#input-confirm").fill(password);
    }

    async isSubscribeChecked(){
       return this.page.locator("(//label[@class='custom-control-label'])[2]");
    }
    
    async clickTermandCondition(){
        await this.page.locator("//label[@for='input-agree']").click();
    }

    async continueToRegister(){
        await Promise.all([
            this.page.waitForLoadState("networkidle"),
            this.page.locator("//input[@type='submit']").click()
        ])
        
    }

}


