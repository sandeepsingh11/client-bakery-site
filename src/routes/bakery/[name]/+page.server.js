/** @type {import('./$types').PageServerLoad} */
export const load = async ({ fetch, params, locals }) => {
    let product;
    let productId = "0";
    locals.products.forEach(localProduct => {
        if (localProduct.slug === params.name) {
            product = localProduct;
            productId = localProduct.id;
        }
    });
    
    // get square product data for variants
    const res = await fetch('/api/products/getById', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            productId
        })
    });
    const productFull = await res.json();

    return {
        product,
        productFull,
        locals
    }
}