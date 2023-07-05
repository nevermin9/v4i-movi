<script>
  import {getContext, onMount} from "svelte"
  import IdbManager from "$lib/utils/idb/index.js"
  import Dictionary from "$lib/utils/idb/models/Dictionary.js"

  const {open} = getContext("modals-root")

  let dictsNames = []

  const openFormCreateDict = () => {
    open('create-dict-form', null, ({result} = {}) => {
      if (result) {
        dictsNames = [...dictsNames, result]
      }
    })
  }

  onMount(async () => {
    const _dicts = await IdbManager.getAll(Dictionary.objectStoreName)
    dictsNames = _dicts.length && _dicts.map(d => d.name)
  })
</script>


<section class="dicts grid grid-cols-2 auto-rows-auto gap-1">
  {#each dictsNames as dictName (dictName)}
    <div class="dicts__dict-container flex bg-blue-900">
      <div class="dicts__dict-container-in flex w-full h-full bg-blue-600">
        <span class="m-auto">
          {dictName}
        </span>
      </div>
    </div>
  {/each}

  <button
      type="button"
      class="dicts__dict-container flex bg-blue-900"
      on:click={openFormCreateDict}
  >
      <span class="dicts__dict-container-in flex w-full h-full bg-blue-600">
        <span class="m-auto">
          +
        </span>
      </span>
  </button>
</section>

<style lang="scss">
  .dicts {
    $border-radius: .175rem;
    $border-width: .175rem;

    &__dict-container {
      border-radius: calc($border-radius + $border-width);
      padding: $border-width;
    }

    &__dict-container-in {
      border-radius: $border-radius;
    }
  }
</style>


