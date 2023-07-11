<script>
  import {getContext, onMount} from "svelte"
  import IdbManager from "$lib/utils/idb/index.js"
  import Dictionary from "$lib/utils/idb/models/Dictionary.js"

  const {open} = getContext("modals-root")

  let dictsNames = []

  const openFormCreateDict = () => {
    open({
      name: 'create-dict-form',
      onClose: ({result} = {}) => {
        if (result) {
          dictsNames = [...dictsNames, result]
        }
      }
    })
  }

  onMount(async () => {
    const _dicts = await IdbManager.getAll(Dictionary.objectStoreName)
    dictsNames = _dicts.length && _dicts.map(d => d.name)
  })
</script>


<section class="dicts grid grid-cols-2 auto-rows-auto gap-1">
  <a
      href="/dicts/saved"
      class="dicts__dict-container flex bg-blue-900"
  >
    <span class="dicts__dict-container-in flex w-full h-full bg-blue-600">
        <span class="m-auto">
          Saved
        </span>
    </span>
  </a>

  {#each dictsNames as dictName (dictName)}
    <a
        href="/dicts/{dictName}"
        class="dicts__dict-container flex bg-blue-900">
      <span class="dicts__dict-container-in flex w-full h-full bg-blue-600">
        <span class="m-auto">
          {dictName}
        </span>
      </span>
    </a>
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


