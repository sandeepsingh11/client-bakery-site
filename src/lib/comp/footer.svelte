<script>
    import { website } from '$lib/_data/site.json'
    import { socials } from '$lib/_data/socials.json'
    import { Facebook, Instagram, Twitter, Music2 } from "lucide-svelte";

    /** @type {import('$lib/_data/navigation.json')['navItems']} */
    export let navItems;

    export const year = new Date().getFullYear();
    
    // flag to display socials
    export let isSocial = false;
    let count = 0;
    socials.forEach(social => {
        if (!social.isActive) count++;
    });
    if (count !== 4) isSocial = true;
</script>

<footer class="bg-primary-300 grid grid-cols-1 md:grid-cols-3 justify-items-center gap-4 px-4 md:px-8 xl:px-12 py-4">
    <!-- credits -->
    <div class="md:justify-self-start text-center md:text-left self-center">
        <p>&copy { (year) ? year : '2024' } { website.name }</p>
        <p>Coded by <a href="https://sandeepdev.com" target="_blank" rel="noopener noreferrer">Sandeep</a></p>
    </div>

    <!-- socials -->
    <div>
        {#if isSocial}
            <h4 class="mb-1 text-xl font-medium text-center">Socials</h4>

            <div class="flex justify-center gap-2">
                {#each socials as social }
                    {#if social.isActive }
                        <div class="w-[25px] h-[25px]">
                            <a href="{ social.url }" target="_blank" rel="noopener noreferrer">
                                {#if social.name === 'facebook'}
                                    <Facebook />
                                {:else if social.name === 'instagram'}
                                    <Instagram />
                                {:else if social.name === 'twitter'}
                                    <Twitter />
                                {:else if social.name === 'tiktok'}
                                    <Music2 />
                                {/if}
                            </a>
                        </div>
                    {/if}
                {/each}
            </div>
        {/if}
    </div>

    <!-- pages -->
    <div class="md:justify-self-end">
        <h4 class="mb-1 text-xl font-medium">Pages</h4>

        <div class="flex flex-wrap flex-col">
            {#each navItems as item }
                <div>
                    <a href="{ item.url }">{ item.name }</a>
                </div>
            {/each}
        </div>
    </div>
</footer>