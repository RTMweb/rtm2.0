<template>
	<div>
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
			<swiper-slide v-for="(sermon, index) in series" key="index">
				<div>
					<div
						class="main grid w-full relative rounded-md content-end p-4 mb-4"
						:style="{
							backgroundImage: `url(${sermon.image})`
						}"
					>
						{{ sermon.title }}
					</div>
				</div>
			</swiper-slide>
		</Swiper>
		<div @click="prev()">prev</div>
		<div @click="next()">next</div>
	</div>
</template>

<script setup>
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
