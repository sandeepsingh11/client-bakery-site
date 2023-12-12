<script>
    /** @type {import('./$types').PageServerData} */
    export let data;

    export let product = data.product;
</script>

<h1>{ product.name }</h1>
<p>{ product.desc }</p>
<p>{ product.displayPrice }</p>
{#if product.images }
    {#each product.images as image}
        <div>
            <img src="{ image.url }" alt="{ image.name }">
        </div>
    {/each}
{/if}
<div>
    <p>Variations:</p>
    {#each product.variations as variation}
        <div>
            <span>{ variation.name } - { variation.price }</span>
        </div>
    {/each}
    <p>Mods:</p>
    {#each product.mods as mod}
        <div>
            <span>{ mod.name } - { mod.price || 0 }</span>
        </div>
    {/each}
</div>