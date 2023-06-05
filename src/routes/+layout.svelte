<script>
  import "$/style/base/1index.scss"
  import {onMount} from 'svelte'

  onMount(() => {
    console.log ('cached', caches)
  })

</script>

<slot />

<style lang="scss">
  :global(html) {
    height: 100%;
    font-family: 'Roboto Slab', serif;
    @apply bg-blue-600 text-slate-900;
  }

  :global(body) {
    //display: flex;
    //flex-direction: column;
    //min-height: 100vh;
    //min-height: 100svh;
    height: 100%;
  }
</style>
