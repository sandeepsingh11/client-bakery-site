import { cartCookieName, deleteCookie, getCart, getCookie, getOrder, orderCookieName, writeCookieViaServer } from '$lib/cookies';
import { mapProducts, square } from '$lib/utils';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // get and map Square products
    if (!event.locals.products) {
        let products;

        if (!(products = event.cookies.get('ob_products'))) {
            // fetch products
            event.locals.products = await mapProducts();

            let date = new Date();
            date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));

            // store products for a day to prevent constant fetching
            event.cookies.set('ob_products', JSON.stringify(event.locals.products), {
                path: '/',
                expires: date 
            });
        }
        else {
            event.locals.products = JSON.parse(products);
        }
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

        writeCookieViaServer(event.cookies, cartCookieName, event.locals.cart);
    }
    // otherwise set the existing cart
    else {
        event.locals.cart = getCart(encodedCart);
    }
    
    return await resolve(event);
}