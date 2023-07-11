<script>
  import {page} from "$app/stores"

  export let items
</script>

<nav
    class="absolute z-6666"
    on:click|stopPropagation={() => ({})}
>
  <ul
      class="flex flex-col gap-2"
  >
    {#each items as item (item.id)}
      {#if !item.hideMe($page.url.pathname)}
        <li
            class="p-0.5 text-2xl rounded-full bg-blue-900"
        >
          <a
              class="block p-4 w-full h-full rounded-full bg-blue-600"
              href="{item.href}"
          >
            <svelte:component this={item.icon} />
          </a>
        </li>
      {/if}
    {/each}
  </ul>
</nav>
