
<script>
  import httpClient from '$lib/utils/http-client'
  import Loader from '$lib/components/loader.svelte'
  import {onMount} from 'svelte'
  import {debounce} from 'lodash-es'

  let search = ''
  let searchResult = null
  let isMobile = true
  let p = null

  const debounced = debounce(async () => {
    const params = {
      letterPattern: `^${search}`
    }
    console.log("DEBOUNCED")
    p = httpClient.get('/words', {params})

    searchResult = await p
      .then(res => res.json())
      .then(json => json.results.data)
    console.log(searchResult)
  }, 500)

  $: {
    if (search?.length > 2) {
      console.log(search)
      debounced()
    }
  }

  function createMatchMediaQuery (width) {
    return window.matchMedia(`(min-width: ${width}px)`)
  }

  onMount(() => {
    const mediaQuery = createMatchMediaQuery(640)
    // remove event listener on destroy?
    mediaQuery.addEventListener('change', (e) => {
      isMobile = !e.matches
    })
  })

</script>

<section
    class="the-page flex flex-col justify-end sm:justify-center items-center h-full p-4"
>
  {#if searchResult?.length > 0}
    <ul data-sveltekit-preload-data="tap" class="the-page__result-list">
      {#each searchResult.reverse() as word (word)}
        <li>
          <a
              href={`/word/${word}`}
          >
            {word}
          </a>
        </li>
      {/each}
    </ul>
  {/if}


  <form
      action="/lookup"
      method="get"
      data-name="lookup-form"
      autocomplete="off"
      class="flex"
  >
    <label
        class="flex"
    >
        <Loader width="{20}" />
      <!-- {#await p }
        <Loader width="{20}" />
      {/await } -->
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

  {#if !isMobile}
    <nav>
      or <a href="/dict">visit you dict</a>

      or visit you

      <a href="/cards">
        cards
      </a>
    </nav>
  {/if}
</section>

<style lang="scss">
  .the-page {
    position: relative;

    &__nav {
      position: absolute;
      top: 50%;
      right: 10%;
      transform: translateY(-50%);
    }
  }

</style>
