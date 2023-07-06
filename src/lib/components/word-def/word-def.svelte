<script>
  export let wordDefinition = {};
  let clazz = '';
  export { clazz as class };
</script>

<article class="{clazz} w-full bg-slate-300 px-2 shadow-md shadow-black">
  <div class="flex border-b border-slate-600">
    <p class="basis-1/6a grow-0 shrink-0 px-1 font-bold">
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
</article>
