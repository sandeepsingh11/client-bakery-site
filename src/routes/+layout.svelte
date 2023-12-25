<script>
    import navigation from "$lib/_data/navigation.json";
    import CartPreview from "$lib/comp/cart-preview.svelte";
    import { onMount } from "svelte";
    import "../app.pcss";
    
    export let data;
    export const navItems = navigation.navItems;

    /** @type {HTMLElement | null} */
    export let navMobileDropdown;

    onMount(() => {
        navMobileDropdown = document.getElementById('nav-mobile-dropdown');
    });

    function toggleMobileDropdown() {
        navMobileDropdown?.classList.toggle('hidden')
    }

    // collapse mobile dropdown when clicking outside of dropdown
    // @ts-ignore
    function handleDropdownFocusLoss({ relatedTarget, currentTarget }) {
        // use "focusout" event to ensure that we can close the dropdown when clicking outside or when we leave the dropdown with the "Tab" button
        if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return // check if the new focus target doesn't present in the dropdown tree (exclude ul\li padding area because relatedTarget, in this case, will be null
        navMobileDropdown?.classList.add('hidden');
    }
</script>

<svelte:head>
    <script type="text/javascript" src="https://{data.squareCdnPrefix}web.squarecdn.com/v1/square.js"></script>
</svelte:head>

<div class="relative">
    <nav class="fixed top-0 left-0 w-full">
        <!-- mobile nav -->
        <div class="md:hidden flex justify-between bg-primary-200" on:focusout={handleDropdownFocusLoss}>
            <div><a href="/">Home</a></div>

            <!-- hamburger -->
            <div>
                <button type="button" id="nav-mobile-hamburger" on:click={toggleMobileDropdown}>X</button>
            </div>

            <!-- mobile -->
            <div class="hidden absolute top-0 left-0 w-full mt-6 flex flex-col bg-inherit text-center text-lg" id="nav-mobile-dropdown">
                {#each navItems as item}
                    <a href="{ item.url }" class="block">{ item.name }</a>
                {/each}
            </div>
        </div>

        <!-- non mobile nav -->
        <div class="hidden md:flex justify-between">
            <div><a href="/">Home</a></div>

            <div>
                {#each navItems as item}
                    <a href="{ item.url }" class="inline-block py-2 px-3">{ item.name }</a>
                {/each}
            </div>
        </div>
    </nav>
</div>

<div>
    <CartPreview cart={data.locals.cart} />
</div>

<slot />
