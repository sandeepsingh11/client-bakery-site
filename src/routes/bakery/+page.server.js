import { removeFromCart } from '$lib/cart';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {
    return {
        locals,
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    removeItem: async ({request, locals, cookies}) => {
        const form = await (request.formData());
        const itemId = String(form.get('itemId'));

        if (!itemId) return;

        removeFromCart(itemId, locals, cookies);
    }
};