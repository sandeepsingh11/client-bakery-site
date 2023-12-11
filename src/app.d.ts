// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			products: Array<{
				id: string,
				name: string,
				slug: string,
				desc: string,
				images?: Array<{
					id: string,
					name: string,
					url: string,
				}>,
				displayPrice: number
			}>;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
