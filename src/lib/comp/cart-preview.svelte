<script>
    import { cartCookieName, writeCookie } from "$lib/cookies";
    import { MoveRight, X } from "lucide-svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    /** @type {App.Locals['cart']} */
    export let cart;

    export let subtotal = 0.00;
    cart.forEach(item => {
        subtotal += (item.price * item.quantity);
    });

    /** @type NodeJS.Timeout */
    let timer;

    /**
     * @param {Event} e
     * @param {string} itemId
     */
    function handleQuantityUpdate(e, itemId) {
        // update price
        subtotal = 0.00;
        cart.forEach((item, i) => {
            if (item.id === itemId) {
                // @ts-ignore
                item.quantity = e.target?.value;

                // assign for reactivity
                cart[i] = item;
            }

            subtotal += (item.price * item.quantity);
        });

        // debouce the cookie update
        clearTimeout(timer);
        timer = setTimeout(() => {
            writeCookie(cartCookieName, cart);
        }, 2000);
    }
</script>

<div class="z-10 fixed top-0 right-0 bg-white w-full md:w-[350px] h-full overflow-y-auto border-l" id="cart-panel">
    <div class="p-4">
        <div class="flex justify-between mb-6">
            <button class="text-lg font-medium">Cart:</button>
            <button on:click={() => dispatch('x')}><X /></button>
        </div>

        {#if cart.length > 0}
            <!-- list cart items -->
            {#each cart as item}
                <div class="flex">
                    <!-- item image -->
                    <div class="w-[100px] h-[100px]">
                        <img src="{ item.imageUrl ?? 'https://placehold.co/500' }" alt="{ item.name ?? 'Product image' }" class="w-full h-full object-cover rounded">
                    </div>
            
                    <!-- item text -->
                    <div class="ml-2 md:ml-4 py-1 grow">
                        <div>
                            <div class="flex justify-between">
                                <h4 class="text-lg md:text-xl font-medium mb-1">{ item.name }</h4>
                                <form action="/bakery?/removeItem" method="post">
                                    <button><X /></button>
                                    <input type="hidden" name="itemId" value="{item.id}">
                                </form>
                            </div>
                            <!-- variation data -->
                            <p class="mb-px">{ item.variation.name } (${ (item.variation.price) ? item.variation.price.toFixed(2) : '0.00' })</p>
        
                            <!-- mods -->
                            {#if item.mods}
                                {#each item.mods as mod}
                                    <p class="text-sm mb-px ml-1">{ mod.name } (${ mod.price.toFixed(2) })</p>
                                {/each}
                            {/if}
        
                            <!-- quantity -->
                            <input type="number" name="quantity" value="{ item.quantity }" min="0" on:input={(e) => handleQuantityUpdate(e, item.id)} class="w-[50px] rounded mb-px p-1 focus:ring-primary-500 focus:border-primary-500">

                            <!-- item price -->
                            <p class="font-medium">${ (item.price * item.quantity).toFixed(2) }</p>
                        </div>
                    </div>
                </div>

                <hr class="my-2">
            {/each}

            <!-- subtotal and checkout -->
            <div class="flex justify-between mb-2">
                <div>
                    <span class="font-medium">Subtotal:</span>
                </div>

                <div>
                    <span class="font-medium">${ subtotal.toFixed(2) }</span>
                </div>
            </div>

            <div>
                <a href="/checkout" class="block w-full rounded p-2 bg-primary-600 hover:bg-primary-500 focus:bg-primary-500 text-white text-center">Checkout <MoveRight size=16 strokeWidth="2.5" class="inline-block" /></a>
            </div>
        {:else}
            <div>
                You don't have any items in your cart yet!
            </div>
        {/if}
    </div>
</div>