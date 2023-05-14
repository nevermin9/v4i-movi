<script>
  import "$/style/base/1index.scss"
</script>

<section class="root">
  <nav>
    <a href="/">
      home
    </a>

    <a href="/about">
      about
    </a>

    <a href="/dict">
      dict
    </a>
  </nav>

  <h1 class="text-3xl font-bold underline">
    Hello, in your library
  </h1>

  <div class="px-4">
    <slot />
  </div>
</section>

<style lang="scss">
  :global(html) {
    font-family: 'Roboto Slab', serif;
  }

  :global(body) {
    min-height: 100vh;
  }
</style>
