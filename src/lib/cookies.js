export const cartCookieName = 'ob_cart';

/**
 * Set the cart cookie
 * @param {import ('@sveltejs/kit').Cookies} cookies
 * @param {App.Locals["cart"]} cart
 */
export function createCart(cookies, cart) {
    cookies.set(cartCookieName, btoa(JSON.stringify(cart)), {
        path: '/'
    });
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
 * Get the cart object from the cookie
 * @param {string} stringifiedCart 
 */
export function getCart(stringifiedCart) {
    return JSON.parse(atob(stringifiedCart));
}