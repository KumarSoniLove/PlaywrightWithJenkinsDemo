import {test, request, expect} from '@playwright/test'
import postAPIRequest from '../test-data/api_requests/POST_API_Request.json'


test.use({
    baseURL: process.env.BASE_API_URL,
})


test('Create POST API request using static file in playwright & typescript', async ({request}) => {

    //Create POST API Response
   const postAPIResponse = await request.post(`/booking`, {data: postAPIRequest});

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
   expect(jsonPostAPIResponse.booking.firstname).toBe('playwright typescript by testers talk');
   expect(jsonPostAPIResponse.booking.lastname).toBe('playwright javascript by testers talk');

   expect(jsonPostAPIResponse.booking.bookingdates.checkin).toBe('2025-01-01');
   expect(jsonPostAPIResponse.booking.bookingdates.checkout).toBe('2025-01-01');
})

