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

/**
 * Remove a cart item at the specified cart item id
 * @param {string} itemId 
 * @param {App.Locals} locals
 * @param {import ('@sveltejs/kit').Cookies} cookies
 */
export function removeFromCart(itemId, locals, cookies) {
    locals.cart.forEach((item, i) => {
        if (item.id === itemId) {
            // handle removing if only 1 element left
            if (locals.cart.length === 1) locals.cart = [];
            else locals.cart = locals.cart.splice(i, 1);
            
            writeCookieViaServer(cookies, cartCookieName, locals.cart);
            
            return;
        }
    });
}