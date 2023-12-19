import { createCart } from './cookies';

/**
 * Add item to locals cart and update cart cookie
 * @param {App.Locals} locals 
 * @param {import ('@sveltejs/kit').Cookies} cookies
 * @param {*} cartData 
 */
export function addToCart(locals, cookies, cartData) {
    locals.cart.push(cartData);

    createCart(cookies, locals.cart);
}