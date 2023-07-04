<script>
  import "$/style/base/1index.scss"
  import {onMount} from 'svelte'
  import IdbManager from '$lib/utils/idb'

  onMount(async () => {
    await IdbManager.createClient({
      name: 'v4i-movi',
      version: 1,
      objStoresConfig: new Map([
        ['word', {keyPath: 'word'}],
        ['dictionary', {keyPath: 'name'}],
        ['card', {keyPath: 'name'}],
      ]),
    })
    // await IdbManager.insert('card', {name: 'test', words: [{
    //   word: 'anton',
    //     translation: 'anton'
    //   }]}).catch(e => e)
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
