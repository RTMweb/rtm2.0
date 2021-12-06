<template>
	<header class="container h-md grid place-items-center">
		<div
			class="main"
			ref="player"
			id="resi-video-player"
			data-embed-id="c2673063-2297-4e26-b4c8-f809c09a853c"
			keep-alive
		></div>
	</header>
</template>

<script>
	export default {
		head: {
			script: [
				{
					type: 'application/javascript',
					src: 'https://control.resi.io/webplayer/loader.min.js'
				}
			]
		}
	}
</script>

<script setup>
	import { ref, onMounted } from 'vue'
	const player = ref(null)

	onMounted(() => {
		console.log(player.value)
	})
</script>

<style lang="scss" scoped>
	.main {
		height: 100%;
		aspect-ratio: 16/ 9;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}
</style>
