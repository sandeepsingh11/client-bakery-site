import { json } from '@sveltejs/kit';
import { randomUUID } from 'crypto';
import { square } from '$lib/utils.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const req = await request.json();

    /** @type {string} */
    const locationId = req['locationId'];
    /** @type {App.Locals["cart"]} */
    const cart = req['cart'];
    
    // prep line item payload
    let lineItems = Array();
    cart.forEach(item => {
        let mods = Array();
        item.mods?.forEach(mod => {
            mods.push({
                name: mod.name,
                quantity: "1",
                basePriceMoney: {
                    amount: mod.price * 100,
                    currency: 'USD'
                }
            });
        });

        lineItems.push({
            name: item.name,
            quantity: String(item.quantity),
            variationName: item.variation.name,
            modifiers: mods,
            basePriceMoney: {
                amount: item.variation.price * 100,
                currency: 'USD'
            }
        })
    });

    // get Square hosted checkout link
    try {
        const { result } = await square.checkoutApi.createPaymentLink({
            idempotencyKey: randomUUID(),
            order: {
                locationId,
                lineItems
            }
        });

        return json(result);
    } catch (error) {
        console.log(error);
        return json(error);
    }
}