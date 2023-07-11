<script>
  export let type = 'button';
  export let color = 'primary';
  let clazz
  export {clazz as class}
</script>

<button
    class="{clazz}"
    {type}
>
  <span
      class=""
  >
    <slot />
  </span>
</button>
