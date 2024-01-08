<script>
    import { CreditCard, X } from "lucide-svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    /** @type {App.Locals['cart']} */
    export let cart;

    export let subtotal = 0.00;
    cart.forEach(item => {
        subtotal += (item.price * item.quantity);
    });
</script>

<div class="z-10 fixed top-0 right-0 bg-white w-full md:w-[350px] h-full overflow-y-auto border-l" id="cart-panel">
    <div class="p-4">
        <div class="flex justify-between mb-2">
            <h4 class="text-lg font-medium">Cart:</h4>
            <button on:click={() => dispatch('x')}><X /></button>
        </div>

        {#if cart.length > 0}
            <!-- list cart items -->
            {#each cart.reverse() as item}
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
                            <p class="mb-px">{ item.variation.name } (${ item.variation.price })</p>
        
                            {#if item.mods}
                                {#each item.mods as mod}
                                    <p class="text-sm mb-px ml-1">{ mod.name } (${ mod.price })</p>
                                {/each}
                            {/if}
        
                            <p class="mb-px">Qty: { item.quantity }</p>
                            <p class="font-medium">${ item.price * item.quantity }</p>
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
                    <span class="font-medium">${ subtotal }</span>
                </div>
            </div>

            <div>
                <a href="/checkout" class="block w-full rounded p-2 bg-primary-600 hover:bg-primary-500 focus:bg-primary-500 text-white text-center"><CreditCard size=16 class="inline-block" /> Checkout</a>
            </div>
        {:else}
            <div>
                You don't have any items in your cart yet!
            </div>
        {/if}
    </div>
</div>