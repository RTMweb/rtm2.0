<template>
	<div class="relative h-xl">
		<div class="absolute top-1/2 left-10 z-10" @click="prev()">prev</div>
		<div class="absolute top-1/2 right-10 z-10" @click="next()">next</div>
		<swiper slidesPerView="1" @swiper="sermonSwiper" instanceName="sermon">
			<swiper-slide v-for="(sermon, index) in series" key="index" class="">
				<div
					class="bg-red-400 bg-center bg-cover h-xl"
					:style="{ backgroundImage: `url(/images/${sermon.id}.jpg)` }"
				>
					wevkwepknvpwknepvknwpeknvpnp
				</div>
				<!-- <img :src="`/images/${sermon.id}.jpg`" class="place-self-center" /> -->
			</swiper-slide>
		</swiper>
	</div>
</template>

<script setup>
	import { onMounted } from 'vue'
	import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
	import { Swiper, SwiperSlide } from 'swiper/vue'
	import 'swiper/css'
	import 'swiper/scss/navigation'
	import 'swiper/scss/pagination'

	const next = ref(null)
	const prev = ref(null)

	const sermonSwiper = (swiper) => {
		next.value = () => {
			swiper.slideNext()
		}
		prev.value = () => {
			swiper.slidePrev()
		}
	}

	const modules = ref([Navigation, Pagination, Scrollbar, A11y])
	const navigation = ref({
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	})

	const props = defineProps({
		series: {
			required: true,
			type: Array
		}
	})
</script>

<style lang="scss" scoped>
	.swiper-button-next {
		color: red;
	}

	.swiper-button-disabled {
		opacity: 0;
		color: coral;
	}

	.swiper-button-next::after {
		display: none;
	}
	.swiper-button-prev {
		color: red;
	}

	.swiper-button-disabled {
		opacity: 0;
		color: coral;
	}

	.swiper-button-prev::after {
		display: none;
	}
</style>
