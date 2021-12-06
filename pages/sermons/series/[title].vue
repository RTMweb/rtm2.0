<template>
	<div>
		<header class="container h-md bg-red-500 grid place-items-center">
			<iframe
				class="h-full main"
				:src="`https://www.youtube.com/embed/${currentVideo}?list=${sermon.id}&modestbranding=1&controls=1`"
				frameborder="0"
				controls="0"
				allowfullscreen
			>
			</iframe>
		</header>
		<div class="container">
			<Swiper
				:spaceBetween="20"
				:breakpoints="{
					640: { slidesPerView: 4 },
					768: {
						slidesPerView: 4
					},
					1024: {
						slidesPerView: 4
					}
				}"
			>
				<swiper-slide v-for="vid in videos" :key="vid.id">
					<div @click="handleClick(vid.snippet.resourceId.videoId)">
						<div
							class="main grid w-full relative rounded-md content-end p-4 mb-4"
							:style="{
								backgroundImage: `url(${vid.snippet.thumbnails.high.url})`
							}"
						></div>
					</div>
				</swiper-slide>
			</Swiper>
		</div>
	</div>
</template>

<script setup>
	import { Swiper, SwiperSlide } from 'swiper/vue'

	import 'swiper/css'
	import 'swiper/css/grid'

	import { inject, computed } from 'vue'
	import { useRoute } from 'vue-router'
	const route = useRoute()

	const series = inject('sermons')

	const sermon = computed(() => {
		const y = series.filter((x) => x.slug === route.params.title)
		return y[0]
	})

	const config = useRuntimeConfig()

	const KEY = config.GOOGLE_KEY

	const { data } = await useFetch(
		`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${sermon.value.id}&key=${KEY}`
	)

	const videos = data.value.items
	const currentVideo = ref('')

	currentVideo.value = videos[0].snippet.resourceId.videoId

	const handleClick = (id) => {
		currentVideo.value = id
	}
</script>

<style lang="scss" scoped>
	.main {
		aspect-ratio: 14/ 7;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}
</style>
