require('dotenv').config()

import { Stripe } from 'stripe';


async function main() {
    const stripeToken = process.env.STRIPE_SECRET_KEY as string;

    if (!stripeToken) {
        throw new Error("missing stripe token");
    }

    const stripe = new Stripe(stripeToken, { apiVersion: '2022-08-01' })

    try {
        const result = await stripe.paymentIntents.create({
            amount: 100,
            currency: 'usd',
            payment_method_types: []
        }, {
            idempotencyKey: 'intent-xyzt'
        })

        console.log({ result })

    } catch (err) {
        console.log('!! oops', err)
    }
}

main();
