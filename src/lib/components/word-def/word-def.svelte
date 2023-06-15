<script>
  export let wordDefinition = {}
  let clazz = ''
  export { clazz as class }
</script>

<article class="{clazz} w-full bg-slate-300 px-2 shadow-md shadow-black">
  <div class="flex border-b border-slate-600">
    <p class="flex-1 px-1 font-bold">
      {wordDefinition.partOfSpeech}
    </p>

    <p>
      {wordDefinition.definition}
    </p>
  </div>

  <table>
    {#if wordDefinition?.synonyms?.length }
      <tr>
        <th>
          synonyms:
        </th>

        <td>
          {#each wordDefinition.synonyms as synonym (synonym)}
            <i>
              {synonym}
            </i>
          {/each}
        </td>
      </tr>
    {/if}

    {#if wordDefinition?.derivation?.length }
      <tr>
        <th>
          derivation:
        </th>

        <td>
          {#each wordDefinition.derivation as deriv (deriv)}
            <i>
              {deriv}
            </i>
          {/each}
        </td>
      </tr>
    {/if}
  </table>

  <div>
    <button
        class="p-3 uppercase bg-blue-900 text-slate-300 rounded-md"
        type="button"
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
</article>
