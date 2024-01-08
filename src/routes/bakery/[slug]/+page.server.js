import { addToCart } from '$lib/cart';
import { redirect } from '@sveltejs/kit';
import { randomUUID } from 'crypto';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params, locals }) => {
    /** @type {typeof locals.products[0]} */
    let product;
    locals.products.forEach(localProduct => {
        if (localProduct.slug === params.slug) {
            product = localProduct;
        }
    });

    return {
        product,
        locals
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    add: async({ request, locals, params, cookies }) => {
        const form = await request.formData();
        const variationId = String(form.get('variation'));
        const modIds = form.getAll('mods');
        const quantity = Number(form.get('quantity'));

        /** @type {typeof locals.products[0] | undefined} */
        let product;
        locals.products.forEach(p => {
            if (params.slug === p.slug) {
                product = p;
                return;
            }
        });

        if (product === undefined) return;

        // get the selected product variation
        /** @type {typeof locals.cart[0]['variation'] | undefined} */
        let variation;
        product.variations.forEach(v => {
            if (variationId === v.id) {
                variation = {
                    id: v.id,
                    name: v.name,
                    price: v.price
                };
                return;
            }
        });

        if (variation === undefined) return;

        // get any selected modifications
        /** @type {typeof locals.cart[0]['mods']} */
        let mods = [];
        modIds.forEach(modId => {
            product?.mods.forEach(m => {
                if (modId === m.id) {
                    mods?.push({
                        id: m.id,
                        name: m.name,
                        price: m.price || 0.00 // "||" to handle NaN value
                    });
                    return;
                }
            });
        });

        // calculate item price
        let price = variation.price;
        mods.forEach(mod => {
            price += mod.price;
        });

        const cartData = {
            id: randomUUID(),
            productId: product.id,
            name: product.name,
            slug: product.slug,
            imageUrl: product.images?.at(0)?.url,
            variation: variation,
            mods: mods,
            price: Number(price.toFixed(2)),
            quantity
        };

        addToCart(locals, cookies, cartData);

        throw redirect(302, '/bakery');
    }
};