<script>
  import "$/style/base/1index.scss"
  import {onMount} from 'svelte'
  import IdbManager from '$lib/utils/idb'
  import {Dictionary, Word} from '$lib/utils/idb/models'
  import ModalsRoot from '$lib/components/modals/components/modals-root.svelte'

  const IDB_VERSION = 1
  const IDB_NAME = "v4i-movi"

  onMount(async () => {
    await IdbManager.createClient({
      name: IDB_NAME,
      version: IDB_VERSION,
      objStoresConfig: new Map([
        [Word.objectStoreName, Word.objectStoreConfig],
        [Dictionary.objectStoreName, Dictionary.objectStoreConfig],
        ['card', {keyPath: 'name'}],
      ]),
    })
    console.log("i am rooot layout")
    // await IdbManager.insert('card', {name: 'test', words: [{
    //   word: 'anton',
    //     translation: 'anton'
    //   }]}).catch(e => e)
  })

</script>

<ModalsRoot>
  <slot />
</ModalsRoot>

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
