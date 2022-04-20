<template>
  <div>
    <div class="absolute h-full bg-gray-50 z-10 flex flex-col p-4">
      <nuxt-link to="/campus/tampa">Tampas</nuxt-link>
      <nuxt-link to="/campus/wesleychapel">Wesley Chapel</nuxt-link>
    </div>
    <Suspense>
      <div ref="map" class="min-h-screen w-full"></div>
      <template #fallback> Loading... </template>
    </Suspense>
  </div>
</template>

<script setup>
const { $maps } = useNuxtApp();
const map = ref(null);

onMounted(() => {
  $maps(map.value, 27.964157, -82.452606);
});
</script>

<style scoped lang="scss">
.app-map {
  height: 100%;
}
</style>
