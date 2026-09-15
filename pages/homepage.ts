import { Page } from "@playwright/test";

export default class HomePage{ 

    constructor(public page : Page) {

    }

    async clickOnHome(){
        await this.page.getByRole('link', { name: 'Home', exact: true }).click();
    }

    async chooseLaptops(){
        await this.page.getByAltText('Laptops').click();
    }

    async chooseHTCProduct(){
        await this.page.locator("(//a[contains(@class,'carousel d-block')])[1]").click();
    }

    async addFirstProductToCart(){
        await this.page.waitForSelector("(//button[@title='Add to Cart'])[2]", { state: 'visible' });
        await this.page.getByTitle('Add to Cart').nth(1).click();
    }

    async isToastVisible(){
        const toast = await this.page.getByText('View Cart');
        await toast.waitFor({state: 'visible'});
        return toast;
    }

    

}

