export const cartCookieName = 'ob_cart';
export const orderCookieName = 'ob_order';

/**
 * Set the cart cookie
 * @param {import ('@sveltejs/kit').Cookies} cookies
 * @param {App.Locals["cart"]} cart
 */
export function createCartCookie(cookies, cart) {
    cookies.set(cartCookieName, btoa(JSON.stringify(cart)), {
        path: '/'
    });
}

/**
 * Get the cart object from the cookie
 * @param {string} encodedCart 
 */
export function getCart(encodedCart) {
    return JSON.parse(atob(encodedCart));
}

/**
 * Set the order cookie
 * @param {import ('@sveltejs/kit').Cookies} cookies
 * @param {App.Locals["orderId"]} orderId
 */
export function createOrderCookie(cookies, orderId) {
    cookies.set(orderCookieName, btoa(JSON.stringify(orderId)), {
        path: '/'
    });
}

/**
 * Get the order object from the cookie
 * @param {string} encodedOrder 
 */
export function getOrder(encodedOrder) {
    return JSON.parse(atob(encodedOrder));
}

/**
 * Get the specified cookie
 * @param {import ('@sveltejs/kit').Cookies} cookies
 * @param {string} cookieName 
 */
export function getCookie(cookies, cookieName) {
    return cookies.get(cookieName);
}

/**
 * Delete the specified cookie
 * @param {import ('@sveltejs/kit').Cookies} cookies
 * @param {string} cookieName 
 */
export function deleteCookie(cookies, cookieName) {
    cookies.delete(cookieName);
}