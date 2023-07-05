<script>
  import ModalBody from "./components/modal-body.svelte"
  import ModalHeader from "./components/modal-header.svelte"
  import {getContext} from "svelte"

  const {close: closeModal} = getContext("modals-root")

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
    <form>
      <label class="block">
        <span>the dict's name</span>
        <input type="text" name="name" placeholder="Name">
      </label>

      <label class="block">
        <span>the dict's description</span>
        <textarea>

      </textarea>
      </label>
      <!--    here user can add words -->
      <!--    it is better to create separate page with ALL user words -->
      <button>
        create
      </button>
    </form>
  </div>
</ModalBody>
