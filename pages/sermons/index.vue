<template>
	<div>
		<SermonSlider :series="series" />
		<div class="container">
			<div class="grid grid-cols-3 gap-4">
				<div v-for="msg in series" :key="msg.id" class="">
					<div
						@click="
							$router.push({
								path: `/sermons/series/${msg.slug}`
							})
						"
					>
						<div
							class="main grid w-full aspect-video relative rounded-md content-end p-4 mb-4"
							:style="{
								backgroundImage: `url(${msg.image})`
							}"
						></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, inject } from 'vue'

	import SermonSlider from '../../components/SermonSlider.vue'

	const series = inject('sermons')
</script>

<style lang="scss" scoped>
	.main {
		aspect-ratio: 14/ 9;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}
</style>
