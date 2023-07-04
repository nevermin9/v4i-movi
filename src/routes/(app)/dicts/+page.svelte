<script>
  let dicts = []
</script>


<section class="dicts grid grid-cols-2 auto-rows-auto">
  {#each dicts as dict (dict.name)}
    <div class="dicts__dict-container flex bg-blue-900">
      <div class="dicts__dict-container-in m-auto bg-blue-600">
        dict.name
      </div>
    </div>
  {/each}

  <button
      type="button"
      class="dicts__dict-container flex bg-blue-900"
  >
      <span class="dicts__dict-container-in flex w-full h-full bg-blue-600">
        <span class="m-auto">
          +
        </span>
      </span>
  </button>
</section>

<style lang="scss">
  .dicts {
    $border-radius: .175rem;
    $border-width: .175rem;

    &__dict-container {
      border-radius: calc($border-radius + $border-width);
      padding: $border-width;
    }

    &__dict-container-in {
      border-radius: $border-radius;
    }
  }
</style>


