<script>
  import {getContext, onMount} from 'svelte'
  import ModalBody from "./components/modal-body.svelte"
  import ModalHeader from "./components/modal-header.svelte"
  import Dictionary from '$lib/utils/idb/models/Dictionary.js'

  const {close} = getContext("modals-root")
  let dictsNames = []
  let selectedDicts = ["saved"]

  const getDictsNames = async () => {
    dictsNames = await Dictionary.getAllDictsNames()
  }

  onMount(async () => {
    await getDictsNames()
  })

  const closeModal = async () => {
    close({
      result: selectedDicts.filter(d => d !== "saved"),
    })
  }
</script>

<ModalBody class="bg-blue-700">
  <ModalHeader>
    select dicts to add the word

    <button on:click={() => close()}>X</button>
  </ModalHeader>

  <section>
    <div>
      <ul>
        <li>
          <input
              id="saved"
              name="saved"
              value="saved"
              bind:group={selectedDicts}
              type="checkbox"
              disabled
          >
          <label for="saved">Saved</label>
        </li>

        {#each dictsNames as dictName}
          <li>
            <input
                id={dictName}
                name={dictName}
                value={dictName}
                bind:group={selectedDicts}
                type="checkbox"
            >
            <label for={dictName}>{dictName}</label>
          </li>
        {/each}
      </ul>

    </div>

    <div>
      <button
          type="button"
          on:click={() => closeModal()}
      >
        FINISH SELECTING
      </button>
    </div>
  </section>
</ModalBody>

