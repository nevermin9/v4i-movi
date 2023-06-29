<script context="module">
  export function generateCardTransform(
    rotZ = 0,
    rotY = 0,
  ) {
     return `translate(-50%,-50%) rotateZ(${rotZ}deg) rotateY(${rotY}deg)`
  }

  export const throwLeftAnimationClass = 'throw-left'
  export const throwRightAnimationClass = 'throw-right'

</script>

<script>
  // export let rotationZ = 0;
  // export let rotationY = 0;
  export let data = null;
  export let card = null;
  let clazz
  export { clazz as class }


</script>

<!--style:transform={generateCardTransform(rotationZ, rotationY)}-->
<div
    id="card"
    class="card {clazz || ''} w-full max-w-xs m-auto h-64 bg-blue-600 absolute top-1/2 left-1/2"
    bind:this={card}
>
<!--  <div class="card__inner-face w-full h-full bg-blue-700 text-blue-200 flex">-->
    <div class="card__face card__face--front">
      <span class="m-auto text-3xl">
        {data.translation}
      </span>
    </div>

    <div class="card__face card__face--back ">
      <span class="m-auto text-3xl">
        {data.word}
      </span>
    </div>
<!--  </div>-->

<!--  <div>-->
<!--    -->
<!--  </div>-->
</div>

<style lang="scss">
  @keyframes throw-left-animation {
    to {
      transform: translate(-101vw,-101vh) rotateZ(1800deg) rotateY(var(--card-rotate-y, 0deg));
      opacity: 0;
    }
  }

  @keyframes throw-right-animation {
    to {
      transform: translate(101vw,-101vh) rotateZ(-1800deg) rotateY(var(--card-rotate-y, 0deg));
      opacity: 0;
    }
  }

  .card {
    $root: &;
    $border-radius: .175rem;
    $border-width: .175rem;

    z-index: var(--card-z-index, 0);
    padding: $border-width;
    border-radius: calc($border-radius + $border-width);
    transform-style: preserve-3d;
    transition: transform 0.3s ease;
    transform:
            translate(-50%,-50%)
            rotateZ(var(--card-rotate-z, 0deg))
            rotateY(var(--card-rotate-y, 0deg));

    &.throw-left {
      animation-name: throw-left-animation;
      animation-duration: .7s;
    }

    &.throw-right {
      animation-name: throw-right-animation;
      animation-duration: .7s;
    }

    &__face {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: $border-radius;
      @apply text-blue-200 bg-blue-700;

      &--back {
        transform: rotateY(180deg);
      }
    }
  }
</style>
