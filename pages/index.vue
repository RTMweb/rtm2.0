<template>
	<div>
		<header class="bg-red-500 grid place-items-center">
			<video class="video" ref="video" controls poster="/blueprint.jpg">
				<source
					src="https://firebasestorage.googleapis.com/v0/b/revealing-truth-website.appspot.com/o/video%2FJan16.mp4?alt=media&token=30fc83f6-de47-469a-a4ef-f8b3b3f3c02c"
					type="video/mp4"
				/>
			</video>
		</header>
		<div class="max-w-screen-lg mx-auto mt-4 px-4">
			<ClientOnly placeholder="...">
				<MainCard bg-img="/HeroPastors.jpeg" />
			</ClientOnly>
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
	import ThreeCol from '../components/layoutUtils/threeCol.vue'
	import MainTile from '../components/MainTile.vue'
	import SideMenu from '../components/sidemenu/SideMenu.vue'

	import { inject } from 'vue'

	const tiles = inject('hometiles')
</script>

<style></style>
