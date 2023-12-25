<script>
    /** @type {import('$lib/_data/pages/home.json')} */
    export let _data;
</script>

<div class="min-h-screen bg-primary-300 flex flex-wrap items-center p-4">
    <!-- image -->
    <div class="w-full md:w-1/2 my-8 md:mx-auto">
        <img src="{ _data.heroImage }" alt="{ _data.heroImageAlt }" class="w-full max-w-[255px] max-h-[255px] md:max-w-[300px] md:max-h-[300px] lg:max-w-[375px] lg:max-h-[375px] mx-auto">
    </div>

    <!-- hero text -->
    <div class="w-fit md:w-1/2">
        <div class="w-fit mx-8 text-center md:text-left">
            <h1 class="mb-2 text-5xl lg:text-6xl">{ _data.heroSlogan }</h1>
            <p class="mb-4">{ _data.heroDesc }</p>
    
            <a href="/bakery" class="inline-block py-3 px-4 bg-primary-600 hover:bg-primary-500 text-white rounded-sm">{ _data.heroCTA }</a>
        </div>
    </div>
</div>