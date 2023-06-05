<script>
  import {onMount} from 'svelte'

  let card = null

  const screen = {
    width: 0,
    height: 0
  }
  const initScreen = () => {
    screen.width = window.innerWidth
    screen.height = window.innerHeight
  }
  let bounds = null
  let observer = null
  let startX = 0
  let startY = 0
  let cardX = 0
  let cardY = 0
  let gate = false

  $: {
    console.log ("startX: ", startX)
    console.log ("cardX: ", cardX)
    console.log ("===========")
  }

  const onDragStart = e => {
    startX = e.clientX
    startY = e.clientY
    // startX = e.clientX
    gate = true
    //
    observer = new IntersectionObserver((entries) => {
      for (let entry of entries) {
        bounds = entry.boundingClientRect
      }
      // observer.disconnect()
      observer = null
    })
    observer.observe(card)
  }

  const onPointerMove = (e) => {
    console.log ("onPointerMove")
    if (gate) {
      // cardX = Math.abs(startX - e.clientX)
      // cardY = Math.abs(startY - e.clientY)
      console.log("e.clientX: ", e.clientX)
      console.log("e.clientY: ", e.clientY)
      cardX = e.clientX - startX
      cardY = e.clientY - startY
    }
  }

  const onPointerUp = () => {
    gate = false
    console.log ("onPointerUp")
    observer.disconnect()
    observer = null
    // if (observer) {
    //   mouseX = e.clientX
    // }
  }


  onMount(() => {
    initScreen()
    // window.addEventListener('resize', initScreen)
  })

</script>

<section
    on:pointermove={onPointerMove}
    on:pointerdown={onDragStart}
    on:pointerup={onPointerUp}
    class="h-full bg-amber-900"
>
  <div>
    <div
        id="card"
        class="card w-full max-w-xs m-auto h-64 bg-blue-600"
        style:transform={`translate(${cardX}px, ${cardY}px)`}
        bind:this={card}
    >
      <div class="card__inner w-full h-full bg-blue-700 text-blue-200">
        <span>
          the card
        </span>
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  .card {
    $border-radius: .175rem;
    $border-width: .175rem;

    padding: $border-width;
    border-radius: calc($border-radius + $border-width);

    &__inner {
      border-radius: $border-radius;
    }
  }

</style>
