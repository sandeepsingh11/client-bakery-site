import { mapProducts } from '$lib/utils';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    if (!event.locals.products) {
        event.locals.products = await mapProducts();
    }
    
    return await resolve(event);
}