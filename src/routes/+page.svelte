<script>
    import Hero from "$lib/comp/hero.svelte";
    import ProductHighlights from "$lib/comp/product-highlights.svelte";
    import home from "$lib/_data/pages/home.json";
    import AboutSnippet from "$lib/comp/about-snippet.svelte";
    import Categories from "$lib/comp/categories.svelte";
    import Events from "$lib/comp/events.svelte";

    export const _data = home;
    export let data;

</script>

<Hero _data={_data} />

<ProductHighlights _data={_data} products={data.locals.products} />

<AboutSnippet _data={_data} />

<Categories />

<Events />