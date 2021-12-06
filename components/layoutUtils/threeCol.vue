<template>
  <div class="max-w-screen-lg mx-auto">
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-2 space-y-4">
        <slot name="left"></slot>
      </div>
      <div>
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss"></style>
