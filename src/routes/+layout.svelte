<script>
    import CartPreview from "$lib/comp/cart-preview.svelte";
    import { onMount } from "svelte";
    import navigation from "$lib/_data/navigation.json";
    import "../app.pcss";
    
    export let data;
    export const navItems = navigation;

    /** @type {HTMLElement | null} */
    export let navMobileDropdown;

    onMount(() => {
        navMobileDropdown = document.getElementById('nav-mobile-dropdown');
    });

    function toggleMobileDropdown() {
        navMobileDropdown?.classList.toggle('hidden')
    }
</script>

<svelte:head>
    <script type="text/javascript" src="https://{data.squareCdnPrefix}web.squarecdn.com/v1/square.js"></script>
</svelte:head>

<div class="relative">
    <nav class="fixed top-0 left-0 w-full bg-primary-200">
        <!-- mobile -->
        <div class="md:hidden flex justify-between bg-inherit">
            <div><a href="/">Home</a></div>

            <!-- hamburger -->
            <div>
                <button type="button" id="nav-mobile-hamburger" on:click={toggleMobileDropdown}>X</button>
            </div>

            <!-- mobile -->
            <div class="hidden absolute top-0 left-0 w-full mt-6 flex flex-col bg-inherit text-center text-lg" id="nav-mobile-dropdown">
                {#each navItems as item}
                    <a href="{ item.url }" on:click={toggleMobileDropdown}>{ item.name }</a>
                {/each}
            </div>
        </div>
    </nav>
</div>

<div>
    <CartPreview cart={data.locals.cart} />
</div>

<slot />
