<script>
  import httpClient from '$lib/utils/http-client'
  import Loader from '$lib/components/loader.svelte'
  import {debounce} from 'lodash-es'

  let search = ''
  let searchResult = []
  let p = null
  let abortController = null
  const MIN_SEARCH_LENGTH = 3

  const doSearch = async () => {
    if (search.length < MIN_SEARCH_LENGTH) return

    const params = {
      letterPattern: `^${search}`
    }

    if (abortController) abortController.abort()

    abortController = new AbortController()

    const signal = abortController.signal

    p = httpClient.get('/words', {params, signal})
      .then(res => res.json())
      .then(json => json.results.data)
      .catch(err => {
        if (err.name === "AbortError") {
          console.log("Aborted")
          return
        }

        throw err
      })
      .finally(() => {
        abortController = null
      })

    searchResult = await p
  }

  const debouncedDoSearch = debounce(doSearch, 500)

  const stopSearchAndClear = () => {
    abortController?.abort()
    searchResult = []
  }

  $: {
    if (search?.length >= MIN_SEARCH_LENGTH) {
      debouncedDoSearch()
    } else if (!search?.length || search?.length < MIN_SEARCH_LENGTH) {
      stopSearchAndClear()
    }
  }
</script>

{#if searchResult?.length > 0}
  <ul data-sveltekit-preload-data="tap"
      class="the-page__result-list"
  >
    {#each searchResult.reverse() as word (word)}
      <li>
        <a
            href={`/word?search=${word}`}
        >
          {word}
        </a>
      </li>
    {/each}
  </ul>
{/if}


<form
    action="/word"
    method="GET"
    data-name="lookup-form"
    autocomplete="off"
    class="flex"
>
  <label
      class="relative
      flex"
  >
    {#await p }
      <Loader
          class="absolute -left-6 top-1"
          width="{20}"
      />
    {/await }

    <input
        type="text"
        name="search"
        class="bg-transparent outline-0 border-b-2 border-slate-900"
        bind:value={search}
    >
  </label>

  <button
      class="font-bold text-lg"
      data-name="lookup-button"
      type="submit"
  >
    Lookup
  </button>
</form>
