<script context="module">
  export const MODALS_DIR = "../../modals"
</script>

<script>
  import {setContext} from 'svelte'

  let name = ''
  let data = null
  let onClose = null

  const reset = () => {
    name = ''
    data = null
    onClose = null
  }

  const open = (_name, _data, _onClose = () => {}) => {
    name = _name
    data = _data
    onClose = _onClose
  }

  const close = (cb = () => {}) => {
    onClose()
    cb()
    reset()
  }

  setContext("modals-root", {
    open,
    close
  })
</script>

<!--app entry-->
<slot></slot>

<!--overlay-->
{#if name.length > 0}
  {#await import(/* @vite-ignore */ `${MODALS_DIR}/components/overlay.svelte`) then overlay}
    <svelte:component this={overlay.default} />
  {/await}
{/if}

<!--modals-->
{#if name === 'create-dict-form'}
  {#await import(/* @vite-ignore */ `${MODALS_DIR}/create-dict-form.svelte`) then createDictForm}
    <svelte:component this={createDictForm.default} {data} />
  {/await}
{/if}
