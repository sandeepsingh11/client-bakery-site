<script>
    /** @type {App.Locals['cart']} cart */
    export let cart;
</script>

<div class="absolute top-0 right-0">
    {#each cart as item}
        <p>{ item.name }</p>
    {/each}

    <div>
        <a href="/purchase">Checkout</a>
    </div>
</div>