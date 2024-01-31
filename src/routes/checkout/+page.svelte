<script>
    import { orderCookieName, writeCookie } from '$lib/cookies';
    import { ShoppingBag } from 'lucide-svelte';
    import { onMount } from 'svelte';

    export let data;
    const locationId = data.locationId;
    const cart = data.cart;

    onMount(() => {
        handleSquareCheckout();
    })

    async function handleSquareCheckout() {
        const checkoutResponse = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                locationId,
                cart
            })
        });

        if (checkoutResponse.ok) {
            const res = await checkoutResponse.json();
    
            // store Square Order data into locals and cookie
            data.locals.orderId = res.relatedResources.orders[0].id,
    
            writeCookie(orderCookieName, data.locals.orderId);
    
            // redirect to Square checkout page
            window.location = res.paymentLink.longUrl;
        }
    }
</script>

<div class="flex flex-col justify-center items-center min-h-screen px-6">
    <ShoppingBag size=64 class="mb-8" />
    <p>Fetching Square's checkout page, you will be redirected to Square shortly!</p>
</div>