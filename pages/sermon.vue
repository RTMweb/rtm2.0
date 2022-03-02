<template>
	<div>
		<NuxtPage />

		<div class="container">
			<mediaScroller>
				<div v-for="msg in series" :key="msg.id" class="media-element">
					<div>
						<div
							class="main grid w-full aspect-video relative rounded-md content-end p-4 mb-4"
							:style="{
								backgroundImage: `url(${msg.image})`
							}"
						></div>
					</div>
				</div>
			</mediaScroller>
		</div>
	</div>
</template>

<script setup>
	import { ref, inject, provide } from 'vue'
	import Msg from '~~/pages/sermon/[msg].vue'
	import mediaScroller from '../components/ui/mediaScroller.vue'

	const current = ref()
	const messages = ref()
	const series = inject('sermons')
	const currentSeries = ref('PLnoMLl1eIRc6mMrN3Tq5BbVREowKsiP2e&key')

	const config = useRuntimeConfig()
	const KEY = config.GOOGLE_KEY

	const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=PLnoMLl1eIRc6mMrN3Tq5BbVREowKsiP2e&key=${KEY}`

	try {
		const { data } = await useAsyncData('videos', () => $fetch(url))

		messages.value = data.value.items.map((item) => {
			return {
				id: item.id,
				resourceId: item.snippet.resourceId.videoId,
				image: item.snippet.thumbnails.high.url,
				title: item.snippet.title.split('|')[0]
			}
		})
	} catch (err) {
		console.log(err)
	}

	const handleClick = async (msg) => {
		current.value = msg
		currentSeries.value = msg.id
		const config = useRuntimeConfig()
		const KEY = config.GOOGLE_KEY

		const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${msg.id}&key=${KEY}`
		try {
			const { data } = await useFetch(url)

			messages.value = data.value.items.map((item) => {
				const months = [
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
					'August',
					'September',
					'October',
					'November',
					'December'
				]

				const month =
					months[+item.snippet.title.split('|')[3].split('.')[0] - 1]
				const day = item.snippet.title.split('|')[3].split('.')[1]
				const year = item.snippet.title.split('|')[3].split('.')[2]

				return {
					id: item.id,
					resourceId: item.snippet.resourceId.videoId,
					image: item.snippet.thumbnails.high.url,
					title: item.snippet.title.split('|')[0],
					description: item.snippet.description,
					pastor: item.snippet.title.split('|')[2],
					date: month + ' ' + day + ', 20' + year
				}
			})
		} catch (err) {
			console.log(err)
		}
	}

	provide('messages', messages)
	provide('current', current)
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
