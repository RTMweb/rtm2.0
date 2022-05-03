<template>
  <div class="container grid place-items-center">
    <iframe
      loading="lazy"
      class="w-full aspect-video"
      :src="`https://www.youtube.com/embed/${message}?modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&theme=light&color=white&controls=1`"
      frameborder="0"
      color="green"
      allowfullscreen
    >
    </iframe>
  </div>
</template>
<script setup>
const props = defineProps({
  message: {
    type: String,
  },
});
</script>
