
<script>
  import "$/style/base/1index.scss"
  import ModalsRoot from '$lib/components/modals/components/modals-root.svelte'
  import TheHeader from "$lib/components/the-header.svelte"

</script>

<ModalsRoot>
  <div class="flex flex-col h-full">
    <TheHeader />

    <div class="flex-1 h-full">
      <slot />
    </div>
  </div>
</ModalsRoot>

<style lang="scss">
  :global(html) {
    height: 100%;
    font-family: 'Roboto Slab', serif;
    background-color: #2b665e;
    //@apply bg-blue-600 text-slate-900;
  }

  :global(body) {
    //display: flex;
    //flex-direction: column;
    //min-height: 100vh;
    //min-height: 100svh;
    height: 100%;
  }
</style>
