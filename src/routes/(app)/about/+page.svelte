<script>
  export let data;
</script>

<h1>
  about page
</h1>

<ul>
  {#each data.facts as {text}}
    <li>{text}</li>
  {/each}
</ul>
