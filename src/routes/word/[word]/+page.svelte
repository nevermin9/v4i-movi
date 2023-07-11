<script>
  import {getContext} from 'svelte'
  import CheckboxContent from "$lib/components/form/checkbox-content.svelte"
  import WordDef from '$lib/components/word-def/word-def.svelte'
  import {Word} from '$lib/utils/idb/models/index.js'
  // import {onMount} from 'svelte'

  /** @type import('./$types').PageData*/
  export let data;

  let selectedDefs = []
  const {open} = getContext("modals-root")

  const saveWord = (dicts) => {
    const wordData = structuredClone(data.wordData)
    const word = wordData.word
    delete wordData.word
    wordData.results = wordData.results.filter((def) => {
      return selectedDefs.includes(def.definition)
    })
    const wordToSave = new Word({
      word,
      dicts,
      data: wordData,
    })

    return Word.save(wordToSave)
  }

  const openDictListModal = () => {
    open({
      name: 'dicts-list-modal',
      onClose({result: selectedDicts}) {
        return saveWord(selectedDicts)
      }
    })
  }

  const addToDict = () => {
    openDictListModal()
  }
</script>

<section>
  <h1
      class="text-3xl w-full px-2 pt-1 pb-2 bg-slate-300 shadow-md shadow-black"
  >
    {data.wordData.word}
  </h1>

  <h2
      class="text-xl mb-3"
  >
    <i>
      {data.wordData?.pronunciation?.all}
    </i>
  </h2>

  {#each data.wordData?.results as result, i (i)}
    <CheckboxContent
        value={result.definition}
        bind:group={selectedDefs}
        class="block mb-2"
    >
      <WordDef
          wordDefinition="{result}"
      />

    </CheckboxContent>
  {/each}

  <div>
    <button
        class="p-3 uppercase bg-blue-900 text-slate-300 rounded-md"
        type="button"
        on:click={() => addToDict()}
    >
      add to dict
    </button>

    <button
        class="p-3 uppercase bg-blue-900 text-slate-300 rounded-md"
        type="button"
    >
      add to card group
    </button>
  </div>
</section>
