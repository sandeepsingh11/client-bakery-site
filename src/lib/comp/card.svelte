<script>
    import { Cookie, ShoppingCart } from "lucide-svelte";

    /** @type {App.Locals['products'][0]} */
    export let item;
</script>

<div class="w-full lg:w-[225px] xl:w-[300px] mx-auto">
    <!-- product image -->
    <div class="w-full h-[150px] lg:h-[225px] xl:h-[300px]"> 
        <img src="{ (item.images?.at(0)) ? item.images[0].url : "https://placehold.co/500" }" alt="{ item.name }" class="w-full h-full object-cover rounded">
    </div>

    <!-- product name and desc -->
    <div class="py-2 px-2">
        <div class="flex justify-between items-center">
            <h3 class="mb-1 text-xl font-medium">{ item.name }</h3>
            <p>${ item.displayPrice }</p>
        </div>
    </div>

    <!-- buttons -->
    <div class="flex flex-row text-center">
        <a href="/bakery/{ item.slug }" class="inline-block w-1/2 rounded-l p-2 bg-primary-600 hover:bg-primary-500 focus:bg-primary-500 text-white"><Cookie size=16 class="inline" /> View</a>
        <button class="inline-block w-1/2 p-2 rounded-r bg-secondary-600 hover:bg-secondary-500 focus:bg-secondary-500 text-black"><ShoppingCart size=16 class="inline" /> Add</button>
    </div>
</div>