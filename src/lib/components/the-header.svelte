<script context="module">
  import CardIco from "$lib/components/svg/card-ico.svelte"
  import DictIco from "$lib/components/svg/dict-ico.svelte"
  import HomeIco from "$lib/components/svg/home-ico.svelte"

  const MENU_ITEMS = [
    {
      id: "cards",
      name: "Card sets",
      href: "/cards",
      icon: CardIco,
      itIsMe: (pathname) => pathname.startsWith("/cards"),
    },
    {
      id: "home",
      name: "Home",
      href: "/",
      icon: HomeIco,
      itIsMe: (pathname) => pathname === "/",
    },
    {
      id: "dicts",
      name: "My dicts",
      href: "/dicts",
      icon: DictIco,
      itIsMe: (pathname) => pathname.startsWith("/dicts"),
    },
  ]
</script>

<script>
  import SvgRoot from "$lib/components/svg/svg-root.svelte"

</script>

<header class="the-header relative h-20">
  <div
      class="fixed z-7777 top-0 left-0 w-full h-20 p-1"
  >
    <nav
        class="the-header__nav shadow-xl w-full h-full rounded-lg"
    >
      <ul
          class="
        the-header__nav-list
        grid grid-cols-3 grid-rows-1 gap-1 w-full h-full p-1"
      >
        {#each MENU_ITEMS as item (item.id)}
          <li
              class="
              the-header__nav-list-item
              w-full h-full
              p-0.5 text-xs bg-gray-400 shadow-md"
          >
            <a
                href="{item.href}"
                class="
                the-header__nav-list-link
                flex flex-col
                w-full h-full
                active:shadow-inner
                 items-center justify-center"
            >
              <SvgRoot
                  class="the-header__svg-root"
                  width="2em" height="2em">
                <svelte:component this="{item.icon}"/>
              </SvgRoot>

              <span class="the-header__link-name text-center">
                {item.name}
              </span>
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
</header>

<style lang="scss">
  .the-header {
    $root: &;
    $border-radius: .25rem;
    $border-width: .25rem;

    &__nav {
      background-color: #3e5991;
      padding: $border-width;
      border-radius: calc($border-radius + $border-width);
    }

    &__nav-list {
      background-color: #2b3f66;
      border-radius: $border-radius;
    }

    &__nav-list-item {
      border-radius: $border-radius;
    }

    &__nav-list-link:active {
      :global(#{$root}__svg-root) {
        transition: transform .3s;
        transform: translateY(2px);
      }
    }
  }
</style>
