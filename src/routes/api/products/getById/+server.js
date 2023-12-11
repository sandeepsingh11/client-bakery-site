import { square } from "$lib/utils";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    const { productId } = await request.json();
    const { result } = await square.catalogApi.retrieveCatalogObject(productId);

    return json(result.object)
}