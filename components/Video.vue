<template>
	<div
		class="grid place-items-center relative"
		@click="playing = !playing"
		@mouseleave="playing = false"
		@mouseover="playVideo"
	>
		<img
			src="/HeroPastors.jpeg"
			class="absolute object-cover h-full z-10"
			alt=""
			@mouseover="hover = true"
			@mouseleave="hover = false"
			:class="{ fade: hover }"
		/>
		<video
			ref="el"
			class="aspect-video max-h-2xl w-full"
			style="object-fit: cover"
			preload="auto"
		>
			Your browser does not support HTML5 video.
		</video>
	</div>
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

	const hover = ref(false)

	const playVideo = () => {
		el.value.play()
		hover = true
	}
</script>

<style lang="scss">
	.fade {
		opacity: 0;
		transition: all;
		transition-duration: 0.5s;
		transition-timing-function: ease-in-out;
	}
</style>
