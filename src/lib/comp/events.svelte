<script>
    import { events } from "$lib/_data/events.json";
    import Button from "./button.svelte";

    export let limit = -1;

    // sort by upcoming event first
    events.sort(function(a, b) {
        return Number(new Date(b.date + ' ' +  b.time)) - Number(new Date(a.date + ' ' + a.time));
    });
</script>

<section class="py-16 px-2 md:px-16">
    <h2 class="text-4xl text-center mb-12">Local events</h2>

    <div class="lg:w-[80%] lg:mx-auto">
        {#each events as event, i}
            {#if (limit === -1) || (i < limit)}
                <a href="{ (event.url) ? event.url : '#' }" class="event flex rounded mb-4 focus:ring-2 odd:bg-primary-100 odd:hover:bg-primary-200 odd:focus:bg-primary-200 odd:focus:ring-primary-200 even:bg-secondary-200 even:hover:bg-secondary-300 even:focus:bg-secondary-300 even:focus:ring-secondary-300 focus:outline-none">
                    <!-- event image -->
                    <div class="min-w-[100px] w-[100px] min-h-[100px] md:min-w-[150px] md:w-[150px] md:min-h-[150px] md:h-[150px]">
                        <img src="{ (event.thumbnail) ? event.thumbnail : 'https://placehold.co/500' }" alt="{ (event.thumbnailAlt) ? event.thumbnailAlt : 'Generic event thumbnail' }" class="w-full h-full object-cover rounded">
                    </div>

                    <!-- event text -->
                    <div class="ml-2 md:ml-4 py-1">
                        <h4 class="text-lg md:text-2xl font-medium md:mt-4">{ event.title }</h4>
                        <p class="text-sm">{ event.date } | { event.time }</p>
                        <p class="text-sm md:mb-2">{ (event.address) ? event.address : '' }</p>
                        <p>{ event.desc }</p>
                    </div>
                </a>
            {/if}
        {/each}

        {#if limit != -1}
            <div class="mt-8">
                <Button text="More events" url="/events" />
            </div>
        {/if}
    </div>
</section>