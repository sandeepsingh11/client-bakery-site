<script>
    import { navItems } from "$lib/_data/navigation.json";
    import CartPreview from "$lib/comp/cart-preview.svelte";
    import { onMount } from "svelte";
    import "../app.pcss";
    import Footer from "$lib/comp/footer.svelte";
    import { Menu, ShoppingCart, X } from "lucide-svelte";
    import { afterNavigate } from "$app/navigation";
    
    export let data;

    /** @type {HTMLElement | null} */
    export let navMobileDropdown;
    /** @type {HTMLElement | null} */
    export let navEle;
    /** @type {HTMLElement | null} */
    export let mainEle;
    /** @type {HTMLElement | null} */
    export let cartPanelContainer;
    /** @type {HTMLElement | null} */
    export let cartPanelEle;
    export let showMobileMenu = false; 
    export let showCart = false; 

    onMount(() => {
        navMobileDropdown = document.getElementById('nav-mobile-dropdown');
        cartPanelContainer = document.getElementById('cart-panel-container');
        cartPanelEle = document.getElementById('cart-panel');
        
        // offset body by the nav's height amount
        navEle = document.getElementById('nav');
        mainEle = document.getElementById('main');
        if (mainEle) mainEle.style.marginTop = navEle?.clientHeight + 'px';
    });

    afterNavigate(() => {
        // close cart panel after page change
        showCart = false;
    })

    function toggleMobileDropdown() {
        navMobileDropdown?.classList.toggle('hidden')
        showMobileMenu = !showMobileMenu;
    }

    // collapse mobile dropdown when clicking outside of dropdown
    // @ts-ignore
    function handleDropdownFocusLoss({ relatedTarget, currentTarget }) {
        // use "focusout" event to ensure that we can close the dropdown when clicking outside or when we leave the dropdown with the "Tab" button
        if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return // check if the new focus target doesn't present in the dropdown tree (exclude ul\li padding area because relatedTarget, in this case, will be null
        navMobileDropdown?.classList.add('hidden');
    }

    function onCartClick() {
        showCart = !showCart;
    }
</script>

<svelte:head>
    <script type="text/javascript" src="https://{data.squareCdnPrefix}web.squarecdn.com/v1/square.js"></script>
</svelte:head>

<div class="relative">
    <nav class="z-10 fixed top-0 left-0 w-full bg-primary-300" id="nav">
        <!-- mobile nav -->
        <div class="md:hidden flex justify-between bg-primary-200" on:focusout={handleDropdownFocusLoss}>
            <div><a href="/">Home</a></div>

            <!-- hamburger -->
            <div class="mr-2">
                <button type="button" id="nav-mobile-hamburger" on:click={toggleMobileDropdown}>
                    {#if showMobileMenu}
                        <X size=24 class="inline-block" />    
                    {:else}
                        <Menu size=24 class="inline-block" />
                    {/if}
                </button>

                <!-- cart button -->
                <button on:click={() => onCartClick()} class="fixed bottom-0 right-0 bg-primary-300 rounded-full m-2 p-4">
                    <ShoppingCart class="relative top-[3px]" size=18 />
                    <span class="absolute top-[3px] left-0 w-full text-sm">{data.locals.cart.length}</span>
                </button>
            </div>

            <!-- mobile -->
            <div class="hidden z-10 absolute top-0 left-0 w-full mt-6 flex flex-col bg-inherit text-center text-lg" id="nav-mobile-dropdown">
                {#each navItems as item}
                    <a href="{ item.url }" class="block">{ item.name }</a>
                {/each}
            </div>
        </div>

        <!-- non mobile nav -->
        <div class="hidden md:flex justify-between">
            <div><a href="/">Home</a></div>

            <div class="mr-2">
                {#each navItems as item}
                    <a href="{ item.url }" class="inline-block py-2 px-3">{ item.name }</a>
                {/each}

                <button on:click={() => onCartClick()}><ShoppingCart class="inline-block" size=16 /> Cart ({data.locals.cart.length})</button>
            </div>
        </div>
    </nav>

    <!-- cart side-panel -->
    <div id="cart-panel-container" on:focusout={handleDropdownFocusLoss}>
        {#if showCart}
            <CartPreview cart={data.locals.cart} on:x={() => onCartClick()} on:cartUpdated={(event) => data.locals.cart = event.detail.cart} />
        {/if}
    </div>
</div>

<main class="min-h-screen relative" id="main">
    <slot />
</main>

<Footer navItems={navItems} />