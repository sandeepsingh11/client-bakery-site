import { cartCookieName, createCartCookie, deleteCookie, getCart, getCookie, getOrder, orderCookieName } from '$lib/cookies';
import { mapProducts, square } from '$lib/utils';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // get and map Square products
    if (!event.locals.products) {
        event.locals.products = await mapProducts();
    }

    // check if order cookie exists. If so and if the customer has paid for it, clear
    // both the order and cart cookies
    const encodedOrder = getCookie(event.cookies, orderCookieName);
    if (encodedOrder) {
        const orderId = getOrder(encodedOrder);

        // get order state from Square
        const { result } = await square.ordersApi.retrieveOrder(orderId);

        // if paid, reset local values and delete cookies
        if (result.order?.state === 'OPEN') {
            event.locals.orderId = undefined;
            deleteCookie(event.cookies, orderCookieName);
            event.locals.cart = [];
            deleteCookie(event.cookies, cartCookieName);
        }
    }

    // check if cart cookie exists. If not, create it
    const encodedCart = getCookie(event.cookies, cartCookieName);
    if (!encodedCart) {
        event.locals.cart = Array();

        createCartCookie(event.cookies, event.locals.cart);
    }
    // otherwise set the existing cart
    else {
        event.locals.cart = getCart(encodedCart);
    }
    
    return await resolve(event);
}