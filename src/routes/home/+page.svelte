<script>
  const navs = new Map([
    ['search', '/'],
    ['dictionaries', '/dicts'],
    ['card groups', '/card-groups']
  ])
</script>

<section
    class="home"
>
  <nav>
    <ul>
      {#each [...navs] as [title, path] (path)}
        <li>
          <a href="{path}">
            {title}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</section>
