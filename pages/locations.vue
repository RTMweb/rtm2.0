<template>
	<div>
		<div class="absolute h-full bg-gray-50 z-10 flex flex-col p-4">
			<nuxt-link to="/campus/tampa">Tampa</nuxt-link>
			<nuxt-link to="/campus/wesleychapel">Wesley Chapel</nuxt-link>
		</div>
		<div ref="map" class="min-h-screen w-full"></div>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	const { $maps } = useNuxtApp()
	const map = ref(null)

	onMounted(() => {
		$maps(map.value, 27.964157, -82.452606)
	})
</script>

<style scoped lang="scss">
	.app-map {
		@apply h-full;
	}
</style>
