const functions = require('firebase-functions');
const stripe = require('stripe')('sk_test_zWzOgHBrWq72jjUON00Z8rZj');


exports.payWithStripe = functions.https.onRequest((request, response) => {
    console.log(typeof(request.body.amount));
    console.log(typeof(request.body.currency));
    console.log(typeof(request.body.description));
    console.log(request.params.amount);
    stripe.charges.create({
        
        amount: request.body.amount,
        currency: request.body.currency,
        source: 'tok_visa',
        description :request.body.description
    }).then((charge) => {
            // asynchronously called
           response.send(charge);
           return true;
        })
        .catch(err =>{
            console.log(err);
        });

});

