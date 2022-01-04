<template>
	<div class="h-md bg-primary">{{ place }}</div>
	<div class="container mx-auto grid grid-cols-2">
		<div>
			<div>
				Times<br />
				Choose a time and add it to your calendar<br />
			</div>
			<div>Location Info<br /></div>
			<div>Campus Pastors<br /></div>
		</div>
		<div>
			<div>Video</div>
			<div>Campus Pastors<br /></div>
		</div>
	</div>
</template>

<script setup>
	import { ref, reactive } from 'vue'

	import { useRoute } from 'vue-router'
	const route = useRoute()

	const Location = reactive({
		tampa: {},
		wesleychapel: {}
	})

	const place = ref('')
	place.value = route.params.campus
</script>
