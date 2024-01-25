<script>
    import _about from "$lib/_data/pages/about.json";
</script>

<section class="py-4 md:py-12">
    <!-- first snippet -->
    <div class="grid-container">
        <div class="grid grid-cols-1 md:grid-cols-2 items-center mx-auto">
            <div>
                <p class="leading-8 md:py-8 md:px-4">{ _about.aboutSection1 }</p>
            </div>
            <div>
                <img src="{ _about.aboutSection1Img }" alt="{ _about.aboutSection1ImgAlt }" class="w-full max-w-[300px] max-h-[300px] lg:max-w-[375px] lg:max-h-[375px] object-cover my-8 mx-auto rounded-full">
            </div>
        </div>
    </div>

    <!-- second snippet -->
    <div class="bg-primary-400 grid-container">
        <div class="grid grid-cols-1 md:grid-cols-2 items-center mx-auto">
            <div>
                <img src="{ _about.aboutSection2Img1 }" alt="{ _about.aboutSection2Img1Alt }" class="w-full max-w-[150px] max-h-[150px] md:max-w-[200px] md:max-h-[200px] lg:max-w-[225px] lg:max-h-[225px] xl:max-w-[250px] xl:max-h-[250px] object-cover mx-auto rounded-full -translate-x-[30%] translate-y-[15%]">
                <img src="{ _about.aboutSection2Img2 }" alt="{ _about.aboutSection2Img2Alt }" class="w-full max-w-[150px] max-h-[150px] md:max-w-[200px] md:max-h-[200px] lg:max-w-[225px] lg:max-h-[225px] xl:max-w-[250px] xl:max-h-[250px] object-cover mx-auto rounded-full translate-x-[30%] -translate-y-[15%]">
            </div>
            <div>
                <p class="leading-8 md:py-8 md:px-4">{ _about.aboutSection2 }</p>
            </div>
        </div>
    </div>

    <p class="mt-16 mb-12 md:mb-0 text-center">Want to connect? <a href="/contact">Reach out to me here!</a></p>
</section>

<style>
    .grid-container {
        padding: 2rem 0;
    }

    .grid-container > div {
        width: min(90%, 1080px);
    }

    p {
        white-space: pre-line;
    }
</style>