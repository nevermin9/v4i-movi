<script>
  let clazz = ''
  export { clazz as class }
</script>

<section
    id="modal-body"
    class="fixed top-1/2 left-1/2 z-9999
     flex flex-col w-full h-full
      -translate-x-1/2 -translate-y-1/2 {clazz}">
  <slot />
</section>
