<script>
  import {getContext} from "svelte"
  const {close} = getContext("modals-root")

  const closeModal = () => {
    console.log ("close modal")
    close()
  }

</script>

<div
    id="modal-overlay"
    class="fixed top-0 left-0 z-8888
    w-full h-full
     cursor-pointer"
    on:click|stopPropagation={closeModal}
></div>

<style lang="scss">
  #modal-overlay {
    background-color: hsl(0, 0%, 0%, 0.5);
  }
</style>
