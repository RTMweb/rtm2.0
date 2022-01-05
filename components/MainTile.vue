<template>
	<div
		class="main grid w-full relative rounded-md content-end p-6 mb-4"
		:style="{
			backgroundImage: `url(${bgImg})`
		}"
	>
		<div class="text-white">
			<div class="text-2xl font-extrabold title mb-2">
				{{ title }}<br class="md:hidden" />
				<span
					class="font-light whitespace-normal md:(whitespace-nowrap ml-2)"
					>{{ subtitle }}</span
				>
			</div>
			<div class="subttext text-lg my-sm">
				{{ subtext }}
			</div>
			<div class="actions mt-4">
				<a class="btn btn-white" :href="link">Learn More</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'MainTile',
		props: {
			title: {
				type: String,
				required: false
			},
			subtitle: {
				type: String,
				required: false
			},
			subtext: {
				type: String,
				required: false
			},
			bgImg: {
				type: String,
				required: true
			},
			link: {
				type: String,
				required: false
			}
		}
	}
</script>
<style scoped lang="scss">
	.main {
		height: 400px;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}
	.title {
		line-height: 1.5rem;
	}
	.subttext {
		line-height: 1.2rem;
	}
</style>
