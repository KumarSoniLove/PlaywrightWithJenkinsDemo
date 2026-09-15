export async function formatAPIRequest(template: string, values:any[]): Promise<string> {
return template.replace(/{(\d+)}/g, (match, p1) => { 
    const index = parseInt(p1, 10);
    return index < values.length ? String(values[index]) : match;
});
}

export async function getPOSTAPIRequestBody(fname: string, lname: string, price: number, depositPaid: boolean, checkin: string, checkout: string, additionalNeeds: string){
    const apiRequest: BookingAPI = {
        firstname: fname,
        lastname: lname,
        totalprice: price,
        depositpaid: depositPaid,
        bookingdates: {
            checkin: checkin,
            checkout: checkout
        },
        additionalneeds: additionalNeeds
    };
    return apiRequest;
}