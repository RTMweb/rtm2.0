<template>
  <div>
    <div>
      <h3>{{ head }}</h3>
      <h4>{{ subhead }}</h4>
    </div>
    <slot> </slot>
  </div>
</template>

<script>
export default {
  props: {
    head: {
      type: String,
      required: true,
    },
    subhead: {
      type: String,
      default: null,
    },
  },
}
</script>
