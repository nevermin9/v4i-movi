<header
    id="app-header"
    class="h-14"
>
  <nav
      id="app-nav"
      class="fixed z-8888 flex w-full h-14 items-center gap-2 p-4"
  >
    <a href="/">
      home
    </a>

    <a href="/about">
      about
    </a>

    <a href="/dicts">
      dicts
    </a>
  </nav>
</header>

  <div class="flex-1 h-full">
    <slot/>
  </div>
