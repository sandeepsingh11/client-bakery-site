import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, fetch }) {
    const locationId = import.meta.env.VITE_LOCATION_ID;
    const cart = locals.cart;

    const checkoutResponse = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            locationId,
            cart
        })
    });

    if (checkoutResponse.ok) {
        const res = await checkoutResponse.json();

        // redirect to Square checkout page
        throw redirect(303, res.paymentLink.longUrl);
    }
}