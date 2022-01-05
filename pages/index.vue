<template>
	<div>
		<div class="max-w-screen-lg mx-auto mt-4 px-4">
			<MainCard
				bg-img="https://firebasestorage.googleapis.com/v0/b/revealing-truth-website.appspot.com/o/Images%2FHeroPastors.jpg?alt=media&token=c9e86338-7ce5-4b23-8619-0fc2136354a2"
			/>
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
