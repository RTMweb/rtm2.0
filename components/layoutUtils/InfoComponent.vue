<template>
  <div>
    <h3>{{ title }}</h3>
    <p>{{ body }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
}
</script>
