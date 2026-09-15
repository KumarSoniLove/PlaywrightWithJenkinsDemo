import {test as mytest} from '@playwright/test';

type Koushik = {
    email: string,
    age: number
}

const myfixture = mytest.extend<Koushik>({
    email: "abc@aol.com",
    age: 30
})

export const test = myfixture