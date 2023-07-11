<script>
  export let width = "1em"
  export let height = "1em"
  let clazz
  export { clazz as class }
</script>


<svg width={width} height={height} class="{clazz}" viewBox="0 0 16 16">
  <slot />
</svg>

