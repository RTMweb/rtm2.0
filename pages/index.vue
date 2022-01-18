<template>
	<div>
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
