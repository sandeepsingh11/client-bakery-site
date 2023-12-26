<script>
    import { Cake, Cookie, PieChart } from "lucide-svelte";
</script>

<section>
    <div class="flex flex-wrap">
        <a href="/bakery?cat=cake" class="flex flex-col w-full md:w-1/3 justify-center h-[250px] bg-primary-500 hover:bg-primary-400 focus:bg-primary-400 focus:ring-2 focus:ring-primary-500 focus:outline-none">
            <Cake color="#efefef" size=64 class="mx-auto" />
            <p class="text-center text-white font-medium">Cakes</p>
        </a>
        <a href="/bakery?cat=cookie" class="flex flex-col w-full md:w-1/3 justify-center h-[250px] bg-secondary-500 hover:bg-secondary-400 focus:bg-secondary-400 focus:ring-2 focus:ring-secondary-500 focus:outline-none">
            <Cookie color="#333333" size=64 class="mx-auto" />
            <p class="text-center font-medium">Cookies</p>
        </a>
        <a href="/bakery?cat=pie" class="flex flex-col w-full md:w-1/3 justify-center h-[250px] bg-primary-500 hover:bg-primary-400 focus:bg-primary-400 focus:ring-2 focus:ring-primary-500 focus:outline-none">
            <PieChart color="#efefef" size=64 class="mx-auto" />
            <p class="text-center text-white font-medium">Pies</p>
        </a>
    </div>
</section>