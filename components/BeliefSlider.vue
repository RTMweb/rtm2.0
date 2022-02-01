<template>
	<div class="container">
		<Swiper
			:breakpoints="{
				640: { slidesPerView: 1, spaceBetween: 20 },
				768: {
					slidesPerView: 2,
					spaceBetween: 40
				},
				1024: {
					slidesPerView: 3,
					spaceBetween: 100
				}
			}"
			@swiper="beliefSwiper"
			@reachEnd="end = false"
			@fromEdge=";(end = true), (start = true)"
			@reachBeginning="start = false"
			@slideChange="onSlideChange"
		>
			<swiper-slide
				v-for="(slide, index) in slides"
				:key="index"
				class="flex grid place-content-center"
			>
				<div class="border-accent text-white font-extralight h-auto">
					{{ slide }}
				</div>
			</swiper-slide>
		</Swiper>
		<div class="w-full inline-flex">
			<div class="btn mr-auto flex items-center" v-show="start" @click="prev()">
				<div class="bg-primary rounded-1/2 p-2">
					<svg class="prev">
						<use xlink:href="/images/icons/sprite.svg#triangle"></use>
					</svg>
				</div>
				<p class="text-white ml-2">Back</p>
			</div>

			<div class="btn ml-auto flex items-center" v-show="end" @click="next()">
				<p class="text-white mr-2">More</p>
				<div class="bg-primary rounded-1/2 p-2">
					<svg class="next">
						<use xlink:href="/images/icons/sprite.svg#triangle"></use>
					</svg>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted } from 'vue'
	import { Swiper, SwiperSlide } from 'swiper/vue'

	import 'swiper/css'
	import 'swiper/css/grid'

	const mySwiper = ref()
	const end = ref(true)
	const start = ref(false)
	const next = ref(true)
	const prev = ref(false)
	const activeSlide = ref(0)

	const slides = ref([
		'After death, eternal life continues either in heaven or hell, based on your decision to make Jesus Christ your Lord and Savior. When the Rapture occurs, the dead in Christ will rise first, and then those who are alive and remain (those who have accepted Jesus as their Lord and Savior) will be caught up to meet Him in the air.',

		'That Jesus Christ is the Son of God, was crucified, died, and buried. On the third day, He rose from the dead, and later ascended into heaven, where He remains at the right hand of God Almighty.',

		'The Bible was written and inspired by God.',

		'Faith is a practical response to the Word of God.',

		'In water baptism in the name of the Father, Son, and Holy Spirit.',

		'In the authority of Jesus’ name.',

		'In the indwelling and baptism of the Holy Spirit with the evidence of speaking in tongues.',

		'In tithes and offerings as a form of Worship unto God; as a gift that is freely given.',

		'In divine healing—the restoration of health to those who believe and act on the truths written in God’s Word. We further believe that Jesus is our Healer, and that by His stripes, we are already healed.',

		'The local church is the place of membership where God has called you to receive His Word on a consistent basis and to grow spiritually.',

		'In giving alms to the poor, sick, homeless, and others in despair.'
	])

	const beliefSwiper = (swiper) => {
		next.value = () => {
			swiper.slideNext()
		}
		prev.value = () => {
			swiper.slidePrev()
		}
		mySwiper.value = swiper

		activeSlide.value = mySwiper.value.activeIndex
	}

	const onSlideChange = () => {
		activeSlide.value = mySwiper.value.activeIndex
	}

	const backText = computed(() => {
		const str = slides.value[activeSlide.value - 1]
		if (!str) return ''
		return str.slice(0, 10)
	})
	const nextText = computed(() => {
		const str = slides.value[activeSlide.value + 1]
		if (!str) return ''
		return str.slice(0, 10)
	})
</script>

<style lang="scss" scoped>
	.next {
		height: 30px;
		width: 30px;
		fill: #fff;
		transform: rotate(90deg);
	}
	.prev {
		height: 30px;
		width: 30px;
		fill: #fff;
		transform: rotate(-90deg);
	}
	.swiper-slide {
		width: 375px;
	}
</style>
