<script>
    /** @type {import('./$types').PageServerData} */
    export let data;

    export let productFull = data.productFull;
    export let product = data.product;
</script>

<h1>{ product.name }</h1>
<p>{ product.desc }</p>
<p>{ product.displayPrice }</p>
{#if product.images }
    {#each product.images as image}
        <img src="{ image.url }" alt="{ image.name }">
    {/each}
{/if}