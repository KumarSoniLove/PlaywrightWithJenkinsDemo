import {test, request, expect} from '@playwright/test'
import {formatAPIRequest} from '../utils/APIHelpers'
import path from 'path'
import fs from 'fs' 
import {faker} from '@faker-js/faker'


test.use({
    baseURL: process.env.BASE_API_URL,
})


test('Create POST API request using dynamic api request body in playwright & typescript', async ({request}) => {

    //Reading the json file
    const filePath= path.join(__dirname, '../test-data/api_requests/Dynamic_POST_API_Request.json');
    const jsonTemplate = fs.readFileSync(filePath, 'utf-8');
    const values = ['cypress by testers talk', 'javascript by testers talk',1000];

    //updatin the POST API request body
    const postAPIRequest = await formatAPIRequest(jsonTemplate, values);
    
    //Create POST API Response
   const postAPIResponse = await request.post(`/booking`, {data: JSON.parse(postAPIRequest)});

   // Print JSON API Response
   const jsonPostAPIResponse = await postAPIResponse.json();
   console.log('POST API Response : ' + JSON.stringify(jsonPostAPIResponse, null, 2));

   //Validating API response
   expect(postAPIResponse.status()).toBe(200);
   expect(postAPIResponse.statusText()).toBe('OK');
   expect(postAPIResponse.headers()['content-type']).toContain('application/json');

   //Validate property/key names
   expect(jsonPostAPIResponse.booking).toHaveProperty('firstname');
   expect(jsonPostAPIResponse.booking).toHaveProperty('lastname');

   expect(jsonPostAPIResponse.booking.bookingdates).toHaveProperty('checkin');
   expect(jsonPostAPIResponse.booking.bookingdates).toHaveProperty('checkout');

   //validate API response body
   expect(jsonPostAPIResponse.bookingid).toBeGreaterThan(0);
   expect(jsonPostAPIResponse.booking.firstname).toBe('cypress by testers talk');
   expect(jsonPostAPIResponse.booking.lastname).toBe('javascript by testers talk');

   expect(jsonPostAPIResponse.booking.bookingdates.checkin).toBe('2025-01-01');
   expect(jsonPostAPIResponse.booking.bookingdates.checkout).toBe('2025-01-01');
})

test('Create POST API request using dynamic api request body in playwright & typescript 2', async ({request}) => {

    //Reading the json file
    const filePath= path.join(__dirname, '../test-data/api_requests/Dynamic_POST_API_Request.json');
    const jsonTemplate = fs.readFileSync(filePath, 'utf-8');
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalprice = faker.number.int({min: 1000, max: 10000});


    const values = [firstName, lastName, totalprice];

    //updatin the POST API request body
    const postAPIRequest = await formatAPIRequest(jsonTemplate, values);
    
    //Create POST API Response
   const postAPIResponse = await request.post(`/booking`, {data: JSON.parse(postAPIRequest)});

   // Print JSON API Response
   const jsonPostAPIResponse = await postAPIResponse.json();
   console.log('POST API Response : ' + JSON.stringify(jsonPostAPIResponse, null, 2));

   //Validating API response
   expect(postAPIResponse.status()).toBe(200);
   expect(postAPIResponse.statusText()).toBe('OK');
   expect(postAPIResponse.headers()['content-type']).toContain('application/json');

   //Validate property/key names
   expect(jsonPostAPIResponse.booking).toHaveProperty('firstname');
   expect(jsonPostAPIResponse.booking).toHaveProperty('lastname');

   expect(jsonPostAPIResponse.booking.bookingdates).toHaveProperty('checkin');
   expect(jsonPostAPIResponse.booking.bookingdates).toHaveProperty('checkout');

   //validate API response body
   expect(jsonPostAPIResponse.bookingid).toBeGreaterThan(0);
   expect(jsonPostAPIResponse.booking.firstname).toBe(firstName);
   expect(jsonPostAPIResponse.booking.lastname).toBe(lastName);

   expect(jsonPostAPIResponse.booking.bookingdates.checkin).toBe('2025-01-01');
   expect(jsonPostAPIResponse.booking.bookingdates.checkout).toBe('2025-01-01');
})