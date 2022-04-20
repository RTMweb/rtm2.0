<template>
  <div class="container">
    <div ref="mediaScroller" class="media-scroller snaps-inline">
      <slot></slot>
    </div>
    <button @click="slideLeft">Slide left</button>
    <button @click="slideRight">Slide right</button>
  </div>
</template>

<script setup>
const mediaScroller = ref();

const slideLeft = () => {
  mediaScroller.value.scrollLeft -= 250;
};
const slideRight = () => {
  mediaScroller.value.scrollLeft += 250;
};
</script>

<style scoped lang="scss">
.media-scroller {
  display: grid;
  grid-template-rows: min-content;
  grid-auto-flow: column;
  grid-auto-columns: 27%;
  gap: 1rem;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  scroll-behavior: smooth;
}

.snaps-inline {
  scroll-snap-type: inline mandatory;
  scroll-padding: 2rem;

  & > * {
    scroll-snap-align: start;
  }
}
</style>
