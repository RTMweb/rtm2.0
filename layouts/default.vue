<template>
	<div class="mainlayout">
		<NavigationBar :navigation-links="navigationLinks" />

		<div :style="{ marginTop: 5 + 'rem' }" class="">
			<slot></slot>
		</div>

		<!-- <Footer :navigation-links="navigationLinks" /> -->
	</div>
</template>

<script setup>
	import { provide, ref } from 'vue'
	const navigationLinks = ref([
		{
			name: 'about',
			destination: '/about',
			icon: '',
			external: false
		},
		{
			name: 'watch live',
			destination: '/',
			icon: '',
			external: true
		},
		{
			name: 'get involved',
			destination: '/getinvolved',
			icon: 'man',
			external: false
		},
		{
			name: 'locations',
			destination: '/locations',
			icon: 'place',
			external: false
		},
		{
			name: 'sermons',
			destination: '/sermon',
			icon: 'play',
			external: false
		},
		{
			name: 'giving',
			destination: '/',
			icon: 'heart-two',
			external: true
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
		},
		{
			id: 'PLnoMLl1eIRc4493JoX452LtupLdHRBH_P',
			description: 'Built to last Description',
			image: '/images/PLnoMLl1eIRc7M2q48ZyGlwJQ4fn1FsRzr.jpg',
			title: 'Mastermind Intensive',
			slug: 'mastermind-intensive'
		},
		{
			id: 'PLnoMLl1eIRc6mzQQn5PbsvobR6-Xl02oE',
			description: 'Built to last Description',
			image: '/images/PLnoMLl1eIRc6mzQQn5PbsvobR6-Xl02oE.jpg',
			title: 'Soon Enough',
			slug: 'soon-enough'
		},
		{
			id: 'PLnoMLl1eIRc6mMrN3Tq5BbVREowKsiP2e',
			description: 'Built to last Description',
			image: '/images/PLnoMLl1eIRc6mMrN3Tq5BbVREowKsiP2e.jpg',
			title: 'Contend 22',
			slug: 'contend-22'
		}
	])

	const locations = ref([
		{
			campus: 'Tampa, FL Campus',
			times: [
				{
					day: 'Sunday',
					time: '9:00 AM'
				},
				{
					day: 'Sunday',
					time: '11:00 AM'
				}
			],
			pastors: 'Bryan and Rashida Powe',
			image: '',
			video: ''
		}
	])

	const hometiles = ref([
		{
			title: '',
			subtitle: '',
			smalltitle: '',
			bgimg:
				'https://ik.imagekit.io/cpds/Copy_of_RTM_Announcements___Backgrounds__64__r8Q6887yu.png',
			link: 'https://revealingtruthdepartments.churchcenter.com/people/forms/148441',
			view: 'true'
		},
		{
			title: '',
			subtitle: '',
			smalltitle: '',
			bgimg: '/churchonline.jpg',
			link: '/about',
			view: 'true'
		},
		{
			title: '',
			subtitle: '',
			smalltitle: '',
			bgimg: '/embracinglegacytile.png',
			link: '/about',
			view: 'true'
		},
		{
			title: '',
			subtitle: '',
			smalltitle: '',
			bgimg: '/founderdday2022-tile.jpg',
			link: '/about',
			view: 'true'
		},
		{
			title: 'The Blueprint:',
			subtitle: '',
			smalltitle: 'Empowering Leaders Forward',
			bgimg: '/blueprint.jpg',
			link: 'https://www.facebook.com/groups/theblueprintleadership',
			view: 'true'
		},
		{
			title: 'Truth Connections:',
			subtitle: '',
			smalltitle: 'We’re Better Together',
			bgimg: '/TruthConnections.jpg',
			link: 'https://revealingtruthdepartments.churchcenter.com/groups',
			view: 'true'
		}
	])

	provide('hometiles', hometiles.value)
	provide('sermons', series.value)
	provide('locations', locations.value)
</script>

<style lang="scss">
	.container {
		max-width: 1150px;
		@apply px-4;
	}

	.dropshadow {
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	}

	.mainlayout {
		height: 100vh;
		display: grid;
		grid-template-rows: 1fr auto;
		grid-template-columns: 100%;
	}
</style>
