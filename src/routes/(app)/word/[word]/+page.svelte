<script>
  import WordDef from '$lib/components/word-def/word-def.svelte'
  // import {onMount} from 'svelte'

  /** @type import('./$types').PageData*/
  export let data;
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

  {#each data.wordData.results as result, i (i)}
    <WordDef
        wordDefinition="{result}"
        class="mb-2"
    />
  {/each}

</section>
