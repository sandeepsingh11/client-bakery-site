import { cartCookieName, writeCookieViaServer } from './cookies';

/**
 * Add item to locals cart and update cart cookie
 * @param {App.Locals} locals 
 * @param {import ('@sveltejs/kit').Cookies} cookies
 * @param {App.Locals["cart"][0]} cartData 
 */
export function addToCart(locals, cookies, cartData) {
    locals.cart.push(cartData);

    writeCookieViaServer(cookies, cartCookieName, locals.cart);
}