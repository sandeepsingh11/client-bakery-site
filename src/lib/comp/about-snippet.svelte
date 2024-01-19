<script>
    import Button from './button.svelte';

    /** @type {import('$lib/_data/pages/home.json')} */
    export let _data;
</script>

<section class="bg-gradient-to-tr from-secondary-600 to-secondary-500 py-12">
    <div class="flex flex-wrap items-center">
        <!-- about image -->
        <div class="w-full md:w-1/2">
            <img src="{ _data.aboutImage }" alt="{ _data.aboutImageAlt }" class="w-full max-w-[300px] md:max-w-[500px] mx-auto rounded-full p-4">
        </div>

        <!-- about snippet -->
        <div class="w-full md:w-1/2 p-8 pb-0">
            <p class="leading-8 mb-4">{ _data.aboutSnippet }</p>

            <Button url="about" text="Read more" />
        </div>
    </div>
</section>