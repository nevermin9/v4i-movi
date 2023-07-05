<script>
  import ModalBody from "./components/modal-body.svelte"
  import ModalHeader from "./components/modal-header.svelte"
  import {getContext} from "svelte"
  import IdbManager from '$lib/utils/idb'
  import Dictionary from '$lib/utils/idb/models/Dictionary.js'

  const {close: closeModal} = getContext("modals-root")
  let dictName = ""
  let dictDescription = ""
  const createDictionary = async () => {
    const dict = {
      name: dictName,
      description: dictDescription,
      words: []
    }
    const result = await IdbManager.insert(Dictionary.objectStoreName, new Dictionary(dict))
    closeModal(result)
  }
</script>

<ModalBody>
  <ModalHeader class="{'bg-amber-200'}">
    <span>
      create new dict
    </span>

    <button
        type="button"
        class="cursor-pointer"
        on:click|stopPropagation={() => closeModal()}
    >
      X
    </button>
  </ModalHeader>

  <div class="bg-amber-300 w-full h-full">
    <form on:submit={() => createDictionary()}>
      <label class="block">
        <span>the dict's name</span>
        <input
            bind:value={dictName}
            type="text"
            name="name"
            placeholder="Name"
        >
      </label>

      <label class="block">
        <span>the dict's description</span>
        <textarea bind:value={dictDescription}></textarea>
      </label>
      <!--    here user can add words -->
      <!--    it is better to create separate page with ALL user words -->
      <button>
        create
      </button>
    </form>
  </div>
</ModalBody>
