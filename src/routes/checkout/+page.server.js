/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    const locationId = import.meta.env.VITE_LOCATION_ID;
    const cart = locals.cart;

    return {
        locationId,
        cart
    };
}