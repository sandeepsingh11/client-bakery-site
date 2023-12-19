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
				variations: Array<{
					id: string,
					name: string,
					price: number,
				}>,
				mods: Array<{
					id: string,
					name: string,
					price: number,
				}>,
				displayPrice: number
			}>,
			cart: Array<{
				id: string,
				productId: string,
				name: string,
				slug: string,
				imageUrl?: string,
				variation: {
					id: string,
					name: string,
					price: number,
				},
				mods?: Array<{
					id: string,
					name: string,
					price: number,
				}>,
				price: number,
				quantity: number
			}>;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
