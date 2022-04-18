<template>
	<div>
		<Watch
			:message="currentMessage"
			:messageData="currentMessageData"
			v-if="currentMessage"
		/>
		<SermonView :series="currentSeries[0]" v-else />

		<div class="bg-dark-900 h-full text-white">
			<button @click="currentMessage = null">Back Back</button>
			<div class="container">
				<Suspense>
					<mediaScroller>
						<div
							v-for="message in messages"
							key="message.id"
							@click="handleClick(message)"
						>
							<img :src="message.image" />
						</div>
					</mediaScroller>
				</Suspense>
			</div>
		</div>
	</div>
</template>

<script setup>
	import Watch from '../components/Watch.vue'
	import SermonView from '../components/SermonView.vue'
	import { ref, inject, onMounted } from 'vue'
	import { useRoute } from 'vue-router'
	import { useSeriesStore } from '../store/seriesStore'

	import mediaScroller from '../components/ui/mediaScroller.vue'
	const route = useRoute()

	const cm = useSeriesStore()

	console.log(cm.currentMessage)

	const messages = ref()
	const series = inject('sermons')
	const currentMessage = ref(null)
	const currentMessageData = ref(null)

	currentMessage.value = null

	const currentSeries = series.filter(
		(series) => series.id === route.params.series
	)
	const { data } = await useFetch(`/api/youtube/${route.params.series}`)

	messages.value = data.value

	const handleClick = (message) => {
		cm.$patch((state) => {
			state.currentMessage = message.resourceId
		})
		currentMessage.value = message.resourceId
		currentMessageData.value = message
	}
</script>
