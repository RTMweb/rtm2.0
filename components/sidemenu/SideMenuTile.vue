<template>
	<div class="p-4 divide-y shadow-md shadow-gray-600 rounded-md">
		<img :src="image" alt="" v-if="image" />
		<div class="tracking-wider">
			<h3 class="text-2xl font-bold text-secondary">{{ head }}</h3>
			<h4 class="text-sm font-normal text-secondaryLight mb-6">
				{{ subhead }}
			</h4>
		</div>
		<slot> </slot>
	</div>
</template>

<script>
	export default {
		props: {
			head: {
				type: String,
				required: true
			},
			subhead: {
				type: String,
				default: null
			},
			image: {
				type: String,
				default: null
			}
		}
	}
</script>
