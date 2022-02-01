<template>
	<video
		ref="el"
		class="aspect-video max-h-2xl w-full"
		style="object-fit: cover"
		preload="auto"
		:poster="poster"
		@click="playing = !playing"
	>
		Your browser does not support HTML5 video.
	</video>
</template>

<script setup>
	import { ref } from 'vue'
	import { useElementHover, useMediaControls } from '@vueuse/core'

	const props = defineProps({
		poster: { type: String },
		vid: { type: String }
	})

	const el = ref()
	const isHovered = useElementHover(el)

	const { playing, currentTime, duration, volume } = useMediaControls(el, {
		src: props.vid
	})
	// const internalInstance = getCurrentInstance()
	// internalInstance.proxy.$forceUpdate()
</script>
