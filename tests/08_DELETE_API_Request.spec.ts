import { test, request, expect } from '@playwright/test'
import { formatAPIRequest } from '../utils/APIHelpers'
import { getPOSTAPIRequestBody } from '../utils/APIHelpers'
import { faker } from '@faker-js/faker'
import tokenAPIRequest from '../test-data/api_requests/Token_API_Request.json'
import patchAPIRequest from '../test-data/api_requests/PATCH_API_Request.json'


test.use({
    baseURL: process.env.BASE_API_URL,
})



test('Create DELETE API request using playwright & typescript', async ({ request }) => {


    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalprice = faker.number.int({ min: 1000, max: 10000 });

    const postAPIRequest = await getPOSTAPIRequestBody(firstName, lastName, totalprice, true, '2026-09-14', '2026-09-15', 'Breakfast');

    //updatin the POST API request body


    //Create POST API Response
    const postAPIResponse = await request.post(`/booking`, { data: postAPIRequest });

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

    expect(jsonPostAPIResponse.booking.bookingdates.checkin).toBe('2026-09-14');
    expect(jsonPostAPIResponse.booking.bookingdates.checkout).toBe('2026-09-15');

    const bookingId = jsonPostAPIResponse.bookingid;
    console.log('Booking ID : ' + bookingId);
    const getAPIResponse = await request.get(`/booking/${bookingId}`);

    expect(getAPIResponse.status()).toBe(200);
    expect(getAPIResponse.statusText()).toBe('OK');
    const getAPIJSONResponse = await getAPIResponse.json();
    console.log('GET API Response : ' + JSON.stringify(getAPIJSONResponse, null, 2));

    //Generate token
    const tokenAPIResponse = await request.post(`/auth`, { data: tokenAPIRequest });
    //Validate status code and status text
    expect(tokenAPIResponse.status()).toBe(200);
    expect(tokenAPIResponse.statusText()).toBe('OK');
    const tokenAPIJSONResponse = await tokenAPIResponse.json();
    const token = tokenAPIJSONResponse.token;
    console.log('Token : ' + token);

    //Create PATCH API request
    const patchAPIResponse = await request.patch(`/booking/${bookingId}`, {
        data: patchAPIRequest,
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${token}`
        }
    });

    expect(patchAPIResponse.status()).toBe(200);
    expect(patchAPIResponse.statusText()).toBe('OK');

    const patchAPIJSONResponse = await patchAPIResponse.json();
    console.log('PATCH API Response : ' + JSON.stringify(patchAPIJSONResponse, null, 2));

    //Create DELETE API request
    const deleteAPIResponse = await request.delete(`/booking/${bookingId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${token}`
        }
    });

    expect(deleteAPIResponse.status()).toBe(201);
    expect(deleteAPIResponse.statusText()).toBe('Created');
    console.log('DELETE API Response : ' + await deleteAPIResponse.body());

});