<template>
	<div class="mainlayout">
		<NavigationBar :navigation-links="navigationLinks" />

		<div :style="{ marginTop: 6.5 + 'rem' }">
			<slot></slot>
		</div>

		<Footer :navigation-links="navigationLinks" />
	</div>
</template>

<script setup>
	import { provide, ref } from 'vue'
	const navigationLinks = ref([
		{
			name: 'about',
			destination: '/about',
			icon: ''
		},
		{
			name: 'watch live',
			destination: '/live',
			icon: ''
		},
		{
			name: 'get involved',
			destination: '/getinvolved',
			icon: 'man'
		},
		{
			name: 'locations',
			destination: '/locations',
			icon: 'place'
		},
		{
			name: 'sermons',
			destination: '/sermons',
			icon: 'play'
		},
		{
			name: 'giving',
			destination: '/giving',
			icon: 'heart-two'
		}
	])

	const series = ref([
		{
			id: 'PLnoMLl1eIRc5iPhyX6NqVPFXPCpz7WyUP',
			description: 'Only If Description',
			image: '/images/PLnoMLl1eIRc5iPhyX6NqVPFXPCpz7WyUP.jpg',
			title: 'Only If',
			slug: 'only-if'
		},
		{
			id: 'PLnoMLl1eIRc4xLt5yalXQVGiybznE9xn-',
			description: 'Till Death do us part',
			image: '/images/PLnoMLl1eIRc4xLt5yalXQVGiybznE9xn-.jpg',
			title: 'Till Death do us part',
			slug: 'till-death-do-us-part'
		},
		{
			id: 'PLnoMLl1eIRc7DGl_foqDLYb3Twly4ITFf',
			description: 'Roll Call Description',
			image: '/images/PLnoMLl1eIRc7DGl_foqDLYb3Twly4ITFf.jpg',
			title: 'Roll Call',
			slug: 'roll-call'
		},
		{
			id: 'PLnoMLl1eIRc7b1lV_s-10W3Enl1q1GuoY',
			description: "Don'\t Worry Stay Ready! Description",
			image: '/images/PLnoMLl1eIRc7b1lV_s-10W3Enl1q1GuoY.jpg',
			title: "Don'\t Worry Stay Ready! Description",
			slug: 'dont-worry-stay-ready'
		},
		{
			id: 'PLnoMLl1eIRc7M2q48ZyGlwJQ4fn1FsRzr',
			description: 'Built to last Description',
			image: '/images/PLnoMLl1eIRc7M2q48ZyGlwJQ4fn1FsRzr.jpg',
			title: 'Built to last',
			slug: 'built-to-last'
		}
	])

	provide('sermons', series.value)
</script>

<style lang="scss">
	.container {
		max-width: 1150px;
	}

	.mainlayout {
		height: 100vh;
		display: grid;
		grid-template-rows: 1fr auto;
		grid-template-columns: 100%;
	}
</style>
