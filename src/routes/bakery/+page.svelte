<script>
    import Card from '$lib/comp/card.svelte';

    /** @type {import('./$types').PageServerData} */
    export let data;

    export const products = data.locals.products;
</script>

<div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-2 items-start">
    {#each products as product}
        <Card item={product} />
    {/each}
</div>