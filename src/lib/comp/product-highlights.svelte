<script>
    import Button from './button.svelte';
    import Card from './card.svelte';

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
            <Card item={item} />
        {/each}
    </div>
</section>