<script>
  import "../app.pcss";
  
  export let data;
</script>

<svelte:head>
  <script type="text/javascript" src="https://{data.squareCdnPrefix}web.squarecdn.com/v1/square.js"></script>
</svelte:head>

<nav>
  <a href="/">Home</a>
  <a href="/bakery">Bakery</a>
</nav>

<slot />