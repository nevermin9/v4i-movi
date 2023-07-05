<script>
  let clazz = ""
  export { clazz as class }
</script>

<header
    id="modal-header"
    class="relative flex p-4 {clazz}"
>
  <div>
    <h2>
      <slot />
    </h2>
  </div>
</header>
