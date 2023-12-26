<script>
    /** @type {string} */
    export let url;
    /** @type {string} */
    export let text;
    /** @type {string} */
    export let bgColor;
    /** @type {string} */
    export let textColor;
    export let styles = '';
</script>

<a href="{ url }" class="inline-block py-3 px-4 rounded-sm bg-{bgColor}-600 hover:bg-{bgColor}-500 focus:bg-{bgColor}-500 text-{ textColor } focus:ring-2 focus:ring-{ bgColor }-200 focus:outline-none { styles }">{ text }</a>