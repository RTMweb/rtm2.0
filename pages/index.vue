<template>
	<div>
		<div class="grid place-items-center">
			<video
				class="aspect-video max-h-2xl"
				ref="video"
				width="100%"
				controls
				style="object-fit: cover"
				poster="https://firebasestorage.googleapis.com/v0/b/revealing-truth-website.appspot.com/o/Images%2FHeroPastors.jpg?alt=media&token=c9e86338-7ce5-4b23-8619-0fc2136354a2"
			>
				<source
					src="https://firebasestorage.googleapis.com/v0/b/revealing-truth-website.appspot.com/o/video%2FJan16.mp4?alt=media&token=30fc83f6-de47-469a-a4ef-f8b3b3f3c02c"
					type="video/mp4"
				/>
			</video>
		</div>

		<div class="max-w-screen-lg mx-auto mt-4 px-4">
			<MainCard bg-img="/HeroPastors.jpeg" />
		</div>
		<ThreeCol class="mt-4 px-4">
			<template #left>
				<div v-for="tile in tiles">
					<MainTile
						:bg-img="tile.bgimg"
						:title="tile.title"
						:subtitle="tile.subtitle"
						:subtext="tile.smalltitle"
						:link="tile.link"
					/>
				</div>
			</template>
			<template #right>
				<SideMenu />
			</template>
		</ThreeCol>
	</div>
</template>

<script setup>
	import { onMounted, ref } from 'vue'
	import ThreeCol from '../components/layoutUtils/threeCol.vue'
	import MainTile from '../components/MainTile.vue'
	import SideMenu from '../components/sidemenu/SideMenu.vue'
	import { inject } from 'vue'

	const video = ref()
	const tiles = inject('hometiles')

	onMounted(() => {
		console.log(video)
	})
</script>

<style></style>
