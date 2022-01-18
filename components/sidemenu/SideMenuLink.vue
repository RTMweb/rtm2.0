<template>
	<div class="flex gap-2 py-4 items-center hover:bg-light-500">
		<svg class="h-10 w-10 pl-4">
			<use :xlink:href="svg"></use>
		</svg>

		<h4 class="mr-2 flex-grow">{{ text }}</h4>
		<div v-if="externallink" class="pr-4">
			<img src="/images/externalLinkIcon.svg" alt="" />
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			icon: {
				type: String,
				default: null
			},
			text: {
				type: String,
				default: null
			},
			externallink: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			svg() {
				return '/images/icons/sprite.svg#' + this.icon
			}
		}
	}
</script>
