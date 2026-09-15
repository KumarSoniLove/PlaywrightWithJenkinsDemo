import {test as baseTest} from '@playwright/test';
import HomePage from '../pages/homePage';
import LoginPage from '../pages/loginPage';
import RegisterPage from '../pages/registerPage';
import SpecialHotPage from '../pages/specialHotPage';

type pages = {
    homePage: HomePage,
    loginPage: LoginPage,
    registerPage: RegisterPage,
    specialHotPage: SpecialHotPage
}

const testPages = baseTest.extend<pages>({
    registerPage: async ({page}, use) => await use(new RegisterPage(page)),
    loginPage: async ({page}, use) => await use(new LoginPage(page)),
    homePage: async ({page}, use) => await use(new HomePage(page)),
    specialHotPage: async ({page}, use) => await use(new SpecialHotPage(page)), 
})

export const test = testPages;
export const expect = testPages.expect;