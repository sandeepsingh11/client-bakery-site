import { orderCookieName, writeCookieViaServer } from '$lib/cookies';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, fetch, cookies }) {
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

        // store Square Order data into locals and cookie
        locals.orderId = res.relatedResources.orders[0].id,

        writeCookieViaServer(cookies, orderCookieName, locals.orderId);

        // redirect to Square checkout page
        throw redirect(303, res.paymentLink.longUrl);
    }
}