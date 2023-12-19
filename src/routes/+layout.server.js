import { env } from "$env/dynamic/private";

export const load = async ({ locals }) => {
    let squareCdnPrefix = (env.VITE_MODE === "dev") ? "sandbox." : "";

    return {
        squareCdnPrefix,
        locals
    }
}