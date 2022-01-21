<template>
	<div
		class="hero grid min-h-xl w-full relative rounded-md p-4 content-end bg-center dropshadow"
		:style="{
			backgroundImage: `url(${bgImg})`
		}"
	>
		<div class="hero-content">
			<div
				v-if="title"
				class="hero-title font-black font-sofia hero-title-container text-blue-gray-50"
			>
				{{ title }}<br class="md:hidden" />
				<span
					class="font-thin font-proxy text-blue-gray-50 md:(ml-2 whitespace-normal whitespace-nowrap)"
					>{{ subtitle }}</span
				>
			</div>
			<div class="space-x-0 sm:space-y-4 md:space-x-4">
				<button class="btn btn-yellow">Watch Sermons</button>
				<button class="btn btn-outline mt-4 md:mt-0">Watch More Sermons</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: null
			},
			subtitle: {
				type: String,
				default: null
			},
			bgImg: {
				type: String,
				required: true,
				default: null
			},
			link: {
				type: Object,
				default: null
			}
		}
	}
</script>

<style scoped lang="scss">
	.hero {
		min-height: 36rem;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		color: #f8fafc;
	}

	.hero-title {
		font-size: clamp(2rem, 3vw, 3rem);
		line-height: clamp(2.1rem, 3.2vw, 4.6rem);
	}
</style>
