import { cartCookieName, createCart, getCart, getCookie } from '$lib/cookies';
import { mapProducts } from '$lib/utils';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // get and map Square products
    if (!event.locals.products) {
        event.locals.products = await mapProducts();
    }

    // check if cart cookie exists. If not, create it
    const stringifiedCart = getCookie(event.cookies, cartCookieName);
    if (!stringifiedCart) {
        event.locals.cart = Array();

        createCart(event.cookies, event.locals.cart);
    }
    else {
        event.locals.cart = getCart(stringifiedCart);
    }
    
    return await resolve(event);
}