<script>
    /** @type {import('$lib/_data/pages/home.json')} */
    export let _data;
    /** @type {App.Locals['products']} */
    export let products;
    /** @type {App.Locals['products']} */
    export let matchedProducts = Array();

    _data.productHighlight.forEach(item => {
        products.forEach(p => {
            if (item === p.name) {
                matchedProducts.push(p);
                return;
            }
        });
    });
</script>

<section class="py-12">
    <h2 class="text-center text-5xl mb-8">Customer favs</h2>

    <div class="flex flex-wrap justify-center">
        {#each matchedProducts as item}
            <div class="w-[250px] m-4 border">
                <!-- product image -->
                <div class="w-full h-[250px]">
                    <img src="{ (item.images?.at(0)) ? item.images[0].url : "https://placehold.co/500" }" alt="{ item.name }" class="w-full h-full object-cover">
                </div>

                <!-- product name and desc -->
                <div>
                    <h3 class="mb-1 font-medium">{ item.name }</h3>
                    <p>${ item.displayPrice }</p>
                    <p>{ item.desc }</p>
                </div>

                <a href="/bakery/{ item.slug }">View pastry</a>
            </div>
        {/each}
    </div>
</section>