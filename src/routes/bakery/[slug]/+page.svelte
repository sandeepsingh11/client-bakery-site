<script>
    import { ShoppingCart } from 'lucide-svelte';

    /** @type {import('./$types').PageServerData} */
    export let data;

    export let product = data.product;
</script>

<div class="p-8 md:p-12">
    <div class="flex flex-wrap justify-center">
        <!-- product image -->
        <div class="w-[275px] md:w-[375px] xl:w-[500px] mx-auto md:mx-0 mb-8">
            {#if product.images }
                {#each product.images as image}
                    <div class="w-full h-[275px] md:h-[375px] xl:h-[500px]">
                        <img src="{ image.url }" alt="{ image.name }" class="w-full h-full object-cover rounded">
                    </div>
                {/each}
            {:else}
                <div class="w-full h-[275px] md:h-[375px] xl:h-[500px]">
                    <img src="https://placehold.co/500" alt="placeholder" class="w-full h-full object-cover rounded">
                </div>
            {/if}
        </div>

        <!-- product info -->
        <div class="md:ml-12 xl:w-[500px]">
            <div class="mb-8">
                <h1 class="text-3xl lg:text-5xl font-medium mb-2 md:mt-2">{ product.name }</h1>
                <p class="text-lg">{ product.desc ?? '' }</p>
            </div>

            <form action="?/add" method="post">
                <div>
                    {#if product.variations.length > 0}
                        <div class="mb-8">
                            <h3 class="text-2xl mb-2">Set:</h3>

                            <div>
                                {#each product.variations as variation, i}
                                    <div class="mb-2">
                                        <input type="radio" name="variation" id="{variation.id}" value="{variation.id}" class="w-5 h-5 checked:bg-primary-500 checked:hover:bg-primary-500 checked:focus:bg-primary-500 border-primary-500 focus:ring-primary-500" required checked="{(i === 0) ? true : false}">
                                        <label for="{variation.id}">{variation.name} - ${ (variation.price) ? variation.price.toFixed(2) : '0.00' }</label>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}
            
                    {#if product.mods.length > 0}
                        <div class="mb-8">
                            <h3 class="text-2xl mb-2">Options:</h3>
                            {#each product.mods as mod}
                                <div class="mb-1">
                                    <input type="checkbox" name="mods" id="mod-{ mod.id }" value="{ mod.id }" class="rounded checked:bg-primary-500 checked:hover:bg-primary-500 checked:focus:bg-primary-500 border-primary-500 focus:ring-primary-500">
                                    <label for="mod-{ mod.id }">{ mod.name } - ${ (mod.price) ? mod.price.toFixed(2) : '0.00' }</label>
                                </div>
                            {/each}
                        </div>
                    {/if}
            
                    <div class="mb-8">
                        <label for="quantity" class="block text-2xl">Quantity:</label>
                        <input type="number" name="quantity" id="quantity" value="1" class="w-[80px] rounded focus:ring-primary-500 focus:border-primary-500" required>
                    </div>
                </div>
            
                <button class="block w-full py-3 px-4 rounded-sm bg-primary-600 hover:bg-primary-500 focus:bg-primary-500 text-white focus:ring-2 focus:ring-primary-200 focus:outline-none"><ShoppingCart class="inline-block" size=16 /> Add to cart</button>
            </form>
        </div>
    </div>
</div>