<template>
	<header class="container h-md grid place-items-center mt-4">
		<div
			class="main"
			ref="player"
			id="resi-video-player"
			data-embed-id="74114ee9-768f-4a71-ac63-a1e0dfb656c8"
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
	const { data } = await useFetch('')
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
