<script>
  /** @type {import('../../../../.svelte-kit/types/src/routes').PageData} */
  export let data

  let letters = {
    E: [
      {
        id: '42',
        word: 'education',
        pronunciation: 'edjʊˈkeɪʃən',
        options: {
          in_lists: [{
            name: 'my-list',
            id: '1234'
          }],
          association: ['їду на каціон']
        },
        description: {
          meanings: ['the process of teaching and learning, usually at school, college, or university'],
          speech_part: 'noun',
        },
        translation: 'освіта'
      },
      {
        id: '',
        word: 'edit',
        pronunciation: "ˈedɪt",
        options: {
          in_lists: [],
          association: []
        },
        description: {
          meanings: ['to prepare a book, piece of film etc for printing or broadcasting by removing mistakes or parts that are not acceptable'],
          speech_part: 'noun',
        },
        translation: ''
      }
    ],
    F: [
     {
        id: '',
        word: 'famous',
        pronunciation: "ˈfeɪməs",
        options: {
          in_lists: [],
          association: []
        },
        description: {
          meanings: ['known about by many people in many places'],
          speech_part: 'noun',
        },
        translation: ''
      }
    ]
  }
</script>

<section class="dict-page">
  <div class="dict-page__search-box">
    search
    {JSON.stringify(data, null, 2)}
  </div>

  <div class="dict-page__search-box">
    <ul>
      {#each Object.keys(letters) as letter (letter)}
        <li>
          <h4 class="text-2xl font-bold">
            {letter}
          </h4>

          <ul>
            {#each letters[letter] as word, i (word.id)}
              <li
                  class:bg-sky-400={i % 2 === 0}
                  class:bg-sky-300={i % 2 > 0}
                  class="p-1 hover:opacity-80"
              >
                <a
                    href="/word/{word.id}"
                    class="inline-block w-full anchor active:translate-y-0.5"
                >
                  <span>
                    {word.word}
                  </span>
                </a>
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style lang="scss">
  //.anchor {
  //  &:active {
  //    transform: translateY(2px);
  //  }
  //
  //}
  //.dict-page {
  //  &__s-table-container {
  //    width: min(100% - 2rem, 600px);
  //    margin-inline: auto;
  //  }
  //}
</style>

