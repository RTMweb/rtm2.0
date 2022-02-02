<template>
	<div class="bg-dark-900 h-full">
		<header class="container grid place-items-center pt-16">
			<iframe
				ref="vid"
				class="w-full aspect-video"
				:src="`https://www.youtube.com/embed/${currentVideo}?modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&theme=light&color=white&controls=1`"
				frameborder="0"
				color="green"
				allowfullscreen
			>
			</iframe>
		</header>
		<div class="container mt-10 mb-20">
			<h1 class="text-white font-black text-3xl tracking-wide">
				{{ currentTitle }}
			</h1>
			<div class="text-gray-400 font-bold tracking-wide my-2">
				{{ currentPastor }} &bull;
				<span class="font-thin">{{ currentDate }}</span>
			</div>
			<p class="text-gray-400 font-thin max-w-2xl min-h-40">
				{{ currentDescription }}
			</p>
		</div>
		<div class="container mb-20 relative">
			<Swiper
				@swiper="seriesSwiper"
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
				<swiper-slide v-for="(vid, index) in videos" :key="vid.id" ref="el">
					<div @click="handleClick(vid.snippet.resourceId.videoId)">
						<div
							class="main grid w-full relative rounded-md place-content-center p-4 mb-4 text-accent text-6xl"
							:style="{
								backgroundImage: `url(${vid.snippet.thumbnails.high.url})`
							}"
						></div>
						<h4 class="text-white text-sm">
							{{ vid.snippet.title.split('|')[0] }}
						</h4>
						<p class="text-xs text-gray-400 font-light font-wider">
							{{ vid.snippet.title.split('|')[2] }}
						</p>
					</div>
				</swiper-slide>
			</Swiper>
			<div
				@click="prev()"
				class="absolute prev bg-primary rounded-1/2 p-2 h-14 w-14 flex justify-center items-center"
			>
				<i class="fas fa-chevron-left"></i>
			</div>
			<div
				@click="next()"
				class="absolute next bg-primary rounded-1/2 p-2 h-14 w-14 flex justify-center items-center"
			>
				<i class="fas fa-chevron-right"></i>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { inject, computed } from 'vue'
	import { useRoute } from 'vue-router'
	import { Swiper, SwiperSlide } from 'swiper/vue'
	import { useTitle, useElementHover } from '@vueuse/core'

	const el = ref()
	const isHovered = useElementHover(el)

	const title = useTitle()
	console.log(title.value) // print current title

	import 'swiper/css'
	import 'swiper/css/grid'

	const next = ref(null)
	const prev = ref(null)

	const seriesSwiper = (swiper) => {
		next.value = () => {
			swiper.slideNext()
		}
		prev.value = () => {
			swiper.slidePrev()
		}
	}

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

	const currentVideo = ref('')
	const currentTitle = ref('')
	const currentPastor = ref('')
	const currentDate = ref('')
	const currentDescription = ref('')

	currentVideo.value = videos[0].snippet.resourceId.videoId
	const vid = videos.filter(
		(v) => v.snippet.resourceId.videoId === currentVideo.value
	)
	currentTitle.value = vid[0].snippet.title.split('|')[0]

	const handleClick = (id) => {
		currentVideo.value = id
		const vid = videos.filter((v) => v.snippet.resourceId.videoId === id)
		currentTitle.value = vid[0].snippet.title.split('|')[0]
		currentPastor.value = vid[0].snippet.title.split('|')[2]
		currentDescription.value = vid[0].snippet.description

		const month = months[+vid[0].snippet.title.split('|')[3].split('.')[0] - 1]
		const day = vid[0].snippet.title.split('|')[3].split('.')[1]
		const year = vid[0].snippet.title.split('|')[3].split('.')[2]

		currentDate.value = month + ' ' + day + ', 20' + year

		title.value = currentTitle.value + '| Revealing Truth Ministries' // change current title
	}
</script>

<style lang="scss" scoped>
	.main {
		aspect-ratio: 14/ 7;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}

	.prev {
		top: 50%;
		right: 100%;
		z-index: 10;
	}

	.noShow {
		opacity: 0;

		:hover {
			opacity: 1;
		}
	}

	.next {
		color: white;
		left: 98%;
		top: 50%;
		opacity: 0;
		font-size: 2rem;
		cursor: pointer;
		z-index: 10;

		&:hover {
			opacity: 1;
		}
	}
	.prev {
		color: white;
		right: 98%;
		top: 50%;
		opacity: 0;
		font-size: 2rem;
		cursor: pointer;
		z-index: 10;

		&:hover {
			opacity: 1;
		}
	}

	pre {
		@apply;
	}
</style>
