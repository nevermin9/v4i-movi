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

  const open = ({name: n, data: d = null, onClose: fn = () => {} }) => {
    name = n
    data = d
    onClose = fn
  }

  const close = ({result, cb = () => {}} = {}) => {
    onClose(result ? {result} : {})
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
