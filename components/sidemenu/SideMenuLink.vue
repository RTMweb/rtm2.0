<template>
	<div class="flex">
		<div>
			<svg class="h-6 w-6">
				<use :xlink:href="svg"></use>
			</svg>
		</div>
		<h4 class="flex-grow">{{ text }}</h4>
		<div v-if="externallink" class="">
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
