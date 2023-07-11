<script>
  export let wordList = []

  const createDict = (dict, current) => {
    const firstLetter = current.word[0].toUpperCase()
    if (dict[firstLetter]) {
      dict[firstLetter].push(current)
    } else {
      dict[firstLetter] = [current]
    }
    return dict
  }

  let dict = {}
  $: {
    console.log(wordList)
    dict = wordList.reduce(createDict, {})
  }
</script>

<ul>
  {#each Object.keys(dict) as letter}
    <li>
      <h2>{letter}</h2>
      <ul>
        {#each dict[letter] as word}
          <li>{word.word}</li>
        {/each}
      </ul>
    </li>
  {/each}
</ul>
