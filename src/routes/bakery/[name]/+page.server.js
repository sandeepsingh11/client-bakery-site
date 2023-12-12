/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params, locals }) => {
    /** @type {typeof locals.products[0]} */
    let product;
    locals.products.forEach(localProduct => {
        if (localProduct.slug === params.name) {
            product = localProduct;
        }
    });

    return {
        product,
        locals
    }
}