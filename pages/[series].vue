<template>
	<div>
		<Watch
			:message="currentMessage"
			:messageData="currentMessageData"
			v-if="currentMessage"
		/>
		<SermonView :series="currentSeries[0]" v-else />

		<div class="bg-dark-900 h-full text-white">
			<button @click="currentMessage = null">Back Button</button>
			<div class="container">
				<mediaScroller>
					<div
						v-for="message in messages"
						key="message.id"
						@click="handleClick(message)"
					>
						<img :src="message.image" />
					</div>
				</mediaScroller>
			</div>
		</div>
	</div>
</template>

<script setup>
	import Watch from '../components/Watch.vue'
	import SermonView from '../components/SermonView.vue'
	import { ref, inject, provide, onBeforeMount } from 'vue'
	import { useRoute } from 'vue-router'
	import { useFetch } from '@vueuse/core'
	import SeriesSlider from '../components/SermonSlider.vue'
	import mediaScroller from '../components/ui/mediaScroller.vue'

	const route = useRoute()
	const playlist = ref()
	const messages = ref()
	const series = inject('sermons')
	const currentMessage = ref(null)
	const currentMessageData = ref(null)

	onBeforeMount(() => {
		currentMessage.value = null
	})

	const currentSeries = series.filter(
		(series) => series.id === route.params.series
	)

	const config = useRuntimeConfig()
	const KEY = config.GOOGLE_KEY

	const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${route.params.series}&key=${KEY}`

	try {
		const { data } = await useAsyncData('videos', () => $fetch(url))
		// const { isFetching, error, data } = await useFetch(url)
		playlist.value = data.value

		messages.value = data.value.items.map((item) => {
			return {
				id: item.id,
				resourceId: item.snippet.resourceId.videoId,
				image: item.snippet.thumbnails.high.url,
				title: item.snippet.title.split('|')[0],
				description: item.snippet.description,
				pastor: item.snippet.title.split('|')[2],
				date: new Date(item.contentDetails.videoPublishedAt).toLocaleDateString(
					'en-gb',
					{ year: 'numeric', month: 'long', day: 'numeric' }
				)
			}
		})
	} catch (err) {
		console.log(err)
	}

	const handleClick = (message) => {
		currentMessage.value = message.resourceId
		currentMessageData.value = message
	}
</script>
