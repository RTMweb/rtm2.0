<template>
	<div class="divide-y shadow-md shadow-gray-600 rounded-md overflow-hidden">
		<img :src="image" alt="" v-if="image" class="mb-2 px-4 mt-4" />
		<div class="p-4 tracking-wider" v-if="!image">
			<h3 class="text-2xl font-bold text-secondary">{{ head }}</h3>
			<h4 class="text-sm font-normal text-secondaryLight">
				{{ subhead }}
			</h4>
		</div>
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			head: {
				type: String,
				required: false
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
