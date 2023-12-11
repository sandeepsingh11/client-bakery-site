<script>
    /** @type {import('./$types').PageServerData} */
    export let data;

    export const products = data.locals.products;
</script>

<h1>Products!</h1>
{#each products as product}
    <div class="flex flex-wrap">
        <h3>{ product.name }</h3>
        <p>${ product.displayPrice }</p>
        {#if product.images }
            <img src="{ product.images[0].url }" alt="{ product.images[0].name }">
        {/if}
        <div>
            <a href="/bakery/{ product.slug }">View</a>
        </div>
    </div>
{/each}