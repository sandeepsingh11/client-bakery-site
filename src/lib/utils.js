import { Client, Environment } from "square";

// @ts-ignore
BigInt.prototype.toJSON = function () {
    return this.toString();
};  

export const square = new Client({
    accessToken: import.meta.env.VITE_SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox,
});

export async function mapProducts() {
    const { result } = await square.catalogApi.listCatalog(undefined, "ITEM,IMAGE");
    let productsImages = result.objects;

    // add and map product's url slugs
    slugifyProducts(productsImages);

    let mapping = Array();
    productsImages?.forEach(product => {
        if (product.type === "ITEM") {
            let images = undefined;
            if (product.itemData?.imageIds) images = getProductImages(productsImages, product.itemData.imageIds);

            mapping.push({
                id: product.id,
                name: product.itemData?.name,
                slug: product.itemData?.slug,
                desc: product.itemData?.description,
                images,
                displayPrice: Number(product.itemData.variations[0].itemVariationData.priceMoney.amount) / 100
            });
        }
    });

    return mapping;
}

/**
 * @param {import("square").CatalogObject[] | undefined} products 
 * 
 * @returns {import("square").CatalogObject[] | undefined} products
 */
function slugifyProducts(products) {
    products?.forEach(product => {
        if (product.type === "ITEM") product.itemData.slug = product.itemData?.name?.replace(" ", "-").toLowerCase();
    });

    return products;
}

/** 
 * @param {import("square").CatalogObject[] | undefined} productsImages 
 * @param {string[]} imageIds 
 * 
 * @return {{id: string, name: string, url: string}[]} images
 */
function getProductImages(productsImages, imageIds) {
    let images = Array();

    imageIds.forEach(imageId => {
        productsImages?.forEach(productImage => {
            if (productImage.type === "IMAGE") {
                if (productImage.id === imageId) {
                    images.push({
                        id: productImage.id,
                        name: productImage.imageData?.name,
                        url: productImage.imageData?.url
                    });
                }
            }
        });
    });

    return images;
}