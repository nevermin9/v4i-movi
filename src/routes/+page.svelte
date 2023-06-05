<script>

</script>

<section
    class="flex flex-col justify-center items-center h-full"
>
  <form
      action="/lookup"
      method="get"
      data-name="lookup-form"
      autocomplete="off"
  >
    <input
        type="text"
        name="search"
        class="bg-transparent outline-0 border-b-2 border-slate-900"
    >

    <button
        class="font-bold text-lg"
        data-name="lookup-button"
        type="submit"
    >
      Lookup
    </button>
  </form>

  <p>
    or <a href="/dict">visit you dict</a>

    or visit you

    <a href="/cards">
      cards
    </a>
  </p>
</section>
