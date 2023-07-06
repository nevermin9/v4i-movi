<script>
  let clazz = ''
	export let value = '';
  export let checked = false
  export let group = null

  export { clazz as class }

  const ID = 'checkbox-' + Math.random().toString(36).slice(2, 9)

  $: updateGroup(checked)
  $: updateCheckbox(group)

  function updateCheckbox(group) {
    checked = group.includes(value)
  }

  function updateGroup(checked) {
    const index = group.indexOf(value)
    console.log("update froup", checked, index, value, group)

    if (checked) {
      if (index < 0) {
        group.push(value)
        group = group
      }
    } else {
      if (index >= 0) {
        group.splice(index, 1)
        group = group
      }
    }
  }

</script>

<label class="{clazz}" for="{ID}">
  <input {ID} type="checkbox" bind:checked={checked} {value} />

  <slot></slot>
</label>
