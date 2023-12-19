<script>
    /** @type {import('./$types').PageServerData} */
    export let data;

    export let product = data.product;
</script>

<h1>{ product.name }</h1>
<p>{ product.desc }</p>
{#if product.images }
    {#each product.images as image}
        <div>
            <img src="{ image.url }" alt="{ image.name }">
        </div>
    {/each}
{/if}
<form action="?/add" method="post">
    <div>
        {#if product.variations.length > 0}
            <p>Variations:</p>
            <select name="variation" required>
                {#each product.variations as variation}
                    <option value="{ variation.id }">{ variation.name } - { variation.price }</option>
                {/each}
            </select>
        {/if}

        {#if product.mods.length > 0}
            <p>Mods:</p>
            {#each product.mods as mod}
                <div>
                    <input type="checkbox" name="mods" id="mod-{ mod.name }" value="{ mod.id }">
                    <label for="mod-{ mod.name }">{ mod.name } - { mod.price || 0 }</label>
                </div>
            {/each}
        {/if}

        <div>
            <label for="quantity">Quantity:</label>
            <input type="number" name="quantity" value="1" required>
        </div>
    </div>

    <button>Add to cart</button>
</form>