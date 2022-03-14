<template>
	<div>
		{{ isFetching }}
		<SeriesSlider :series="series" />
		<mediaScroller>
			<div v-for="msg in series" :key="msg.id" class="media-element">
				<nuxt-link :to="`/${msg.id}`">
					<div>
						<div
							class="main grid w-full aspect-video relative rounded-md content-end p-4 mb-4"
							:style="{
								backgroundImage: `url(${msg.image})`
							}"
						></div>
					</div>
				</nuxt-link>
			</div>
		</mediaScroller>
	</div>
</template>

<script setup>
	import { ref, inject, provide } from 'vue'
	import { useFetch } from '@vueuse/core'
	import SeriesSlider from '../components/SermonSlider.vue'
	import mediaScroller from '../components/ui/mediaScroller.vue'

	const series = inject('sermons')

	const config = useRuntimeConfig()
	const KEY = config.GOOGLE_KEY

	const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=PLnoMLl1eIRc6mMrN3Tq5BbVREowKsiP2e&key=${KEY}`

	const { isFetching, error, data } = await useFetch(url)
</script>

<style lang="scss" scoped>
	.main {
		aspect-ratio: 14/ 9;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}

	.media-scroller {
		display: grid;
		grid-template-rows: min-content;
		grid-auto-flow: column;
		grid-auto-columns: 27%;
		gap: 1rem;
		overflow-x: auto;
		overscroll-behavior-inline: contain;
		scroll-behavior: smooth;
	}

	.media-element {
		padding: 1rem;

		& > img {
			inline-size: 100%;
			aspect-ration: 16 /9;
			object-fit: cover;
		}
	}

	.snaps-inline {
		scroll-snap-type: inline mandatory;
		scroll-padding: 2rem;

		& > * {
			scroll-snap-align: start;
		}
	}
</style>
