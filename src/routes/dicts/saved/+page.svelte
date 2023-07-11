
<script>
  import AlphabetWordList from "$lib/components/lists/alphbet-word-list.svelte"

  /** @type {import('./$types').PageData} */
  export let data

  $: console.log("data ->", data)
</script>

<section>
  <AlphabetWordList wordList={data.wordList} />
</section>
