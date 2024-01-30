<script>
    import { onMount } from "svelte";
    import { socials } from "$lib/_data/socials.json";
    import { Facebook, Instagram, Twitter, Music2 } from "lucide-svelte";
    
    export let numActiveSocials = 0;

    onMount(() => {
        // get url params
        const urlParams = new URLSearchParams(window.location.search);

        // display email success message
        const typeVal = urlParams.get('type');
        
        if (typeVal === 'contact_success') {
            const emailSuccessEle = document.getElementById('email_success');
            emailSuccessEle?.classList.add('bg-primary-300', 'mx-auto', 'mb-12', 'py-2', 'px-4', 'w-fit', 'rounded');
            (emailSuccessEle) ? emailSuccessEle.innerText = 'Email has been sent! I will get back to you shortly.' : '';
        }

        socials.forEach(social => {
            if (social.isActive) numActiveSocials++;
        });
    });
</script>

<div class="py-16 w-4/5 lg:w-1/2 mx-auto" id="contact">
    <div id="email_success"></div>

    <div class="grid grid-cols-1 {(numActiveSocials > 0) ? 'md:grid-cols-2' : ''} gap-y-4 mb-4">
        {#if numActiveSocials > 0}
            <div>
                <h3 class="mb-1 text-lg font-medium">Socials</h3>
                {#each socials as social}
                    {#if social.isActive}
                    <span class="inline-block w-[32px] h-[32px] bg-primary-200 rounded mr-1">
                        <a href="{ social.url }" target="_blank" rel="noopener noreferrer">
                            {#if social.name === 'facebook'}
                                <Facebook size=32 stroke-width=2 />
                            {:else if social.name === 'instagram'}
                                <Instagram size=32 stroke-width=2 />
                            {:else if social.name === 'twitter'}
                                <Twitter size=32 stroke-width=2 />
                            {:else if social.name === 'tiktok'}
                                <Music2 size=32 stroke-width=2 />
                            {/if}
                        </a>
                    </span>
                    {/if}
                {/each}
            </div>
        {/if}
        <div>
            <h3 class="mb-1 text-lg font-medium">Events</h3>
            <p>Come visit me in <a href="/events">one of these events</a>!</p>
        </div>
    </div>
    
    <form action="https://api.staticforms.xyz/submit" method="post" class="grid grid-cols-1 md:grid-cols-2 gap-x-2">
        <div>
            <label for="name" class="block">Name:</label>
            <input type="text" name="name" id="name" class="w-full mb-4 rounded shadow-sm focus:ring focus:ring-secondary-600 focus:ring-opacity-75 focus:border-transparent" required>
        </div>
        <div>
            <label for="email" class="block">Email:</label>
            <input type="email" name="email" id="email" class="w-full mb-4 rounded shadow-sm focus:ring focus:ring-secondary-600 focus:ring-opacity-75 focus:border-transparent" required>
        </div>
        <div class="md:col-span-2">
            <label for="subject" class="block">Subject:</label>
            <input type="text" name="subject" id="subject" class="w-full mb-4 rounded shadow-sm focus:ring focus:ring-secondary-600 focus:ring-opacity-75 focus:border-transparent" required>
        </div>
        <div class="md:col-span-2">
            <label for="message" class="block">Message:</label>
            <textarea name="message" id="message" rows="4" class="w-full mb-4 rounded shadow-sm focus:ring focus:ring-secondary-600 focus:ring-opacity-75 focus:border-transparent" required></textarea>
        </div>
    
        <input type="text" name="honeypot" style="display: none;">
    
        <div>
            <button type="submit" class="inline-block py-3 px-4 rounded-sm bg-primary-600 hover:bg-primary-500 focus:bg-primary-500 text-white focus:ring-2 focus:ring-primary-200 focus:outline-none">Send!</button>
        </div>
    
        <input type="hidden" name="accessKey" value="e73f4e79-52e1-4ed0-8872-bf8c6b6b909c">
        <input type="hidden" name="replyTo" value="@">
        <input type="hidden" name="redirectTo" value="http://localhost:5173/contact?type=contact_success">
    </form>
</div>