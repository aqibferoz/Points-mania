const functions = require('firebase-functions');
const stripe = require('stripe')('sk_test_zWzOgHBrWq72jjUON00Z8rZj');


exports.payWithStripe = functions.https.onRequest(async (request, response) => {
    try {
        console.log(request.body)
        const result = await stripe.charges.create({
            amount: request.body.amount,
            currency: request.body.currency,
            source: 'tok_visa',
            description :request.body.description
        })
        if(result) return response.status(200).send(charge);
    } catch (error) {
        return response.status(400).send(error)
    }
});

