<script>
  import { onMount, tick } from 'svelte'

  const OPACITY_THRESHOLD = .15

  export let card = null

  const screen = {
    width: 0,
    height: 0,
  }
  const initScreen = () => {
    screen.width = window.innerWidth
    screen.height = window.innerHeight
  }
  let startX = 0
  let startY = 0
  let cardX = 0
  let cardY = 0
  let gate = false
  let rotation = 0
  let opacity = 1

  const resetCard = async () => {
    await tick()
    cardX = 0
    cardY = 0
    rotation = 0
    opacity = 1
  }
  const openGate = () => gate = true
  const closeGate = () => gate = false

  const onDragStart = (e) => {
    startX = e.clientX - cardX
    startY = e.clientY - cardY
    openGate()
  }

  const calcOpacity = cx => 1 - Math.abs((cx / screen.width) * 2 - 1)

  const onPointerMove = async e => {
    if (gate) {
      cardX = e.clientX - startX
      cardY = e.clientY - startY

      const threshold = screen.width / 8  // Adjust the threshold as needed

      if (cardX > threshold) {
        // Rotate card to the right
        rotation = Math.min(((cardX - threshold) / threshold) * 75, 75)
        opacity = calcOpacity(e.clientX)

        console.log ('right opacity', opacity)
        if (opacity < OPACITY_THRESHOLD) {
          card.remove();
          closeGate()
        }
      } else if (cardX < -threshold) {
        // Rotate card to the left
        rotation = Math.max(((cardX + threshold) / threshold) * 75, -75)
        opacity = calcOpacity(e.clientX)
        // opacity = Math.max(1 + (cardX + threshold) / threshold, 0)
        // opacity = Math.abs((cardX / screen.width) * 2 - 1)

        console.log ('left opacity', opacity)
        if (opacity < OPACITY_THRESHOLD) {
          card.remove();
          closeGate()
        }
      } else {
        // Reset rotation
        await resetCard()
      }
    }
  }

  const onPointerUp = async () => {
    closeGate()

    const threshold = screen.width / 8  // Adjust the threshold as needed

    if (opacity < OPACITY_THRESHOLD) {
      console.log ('bind to the next card')
    }

    if (cardX > threshold) {
      // Card thrown to the right (learned)
      // Handle the action for learned words
      console.log('Card thrown to the right (learned)')
    } else if (cardX < -threshold) {
      // Card thrown to the left (to learn again)
      // Handle the action for words to learn again
      console.log('Card thrown to the left (to learn again)')
    }

    // Reset card position
    await resetCard()
  }

  onMount(() => {
    initScreen()
  })
</script>

<section
    on:pointermove={onPointerMove}
    on:pointerdown={onDragStart}
    on:pointerup={onPointerUp}
    class="flex h-full bg-amber-900 perspective"
>
  <slot {card} {cardX} {cardY} {rotation} {opacity} />
</section>

<style lang="scss">
  .perspective {
    perspective: 1000px;
  }
</style>
