import { square } from "$lib/utils";
import { json } from "@sveltejs/kit";
import { Client, Environment } from "square";

// // @ts-ignore
// BigInt.prototype.toJSON = function () {
//     return this.toString();
// };  

// const { catalogApi } = new Client({
//     accessToken: import.meta.env.VITE_SQUARE_ACCESS_TOKEN,
//     environment: Environment.Sandbox,
// });

export async function GET() {
    const { result } = await square.catalogApi.listCatalog(undefined, "item");

    return json(result.objects)
}