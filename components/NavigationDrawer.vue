<template>
	<div class="drawer">
		<button class="" @click="$emit('close', $event)">Close</button>
		<button class="" href="/">Watch Now</button>

		<div class="flex justify-between space-x-3">
			<div v-for="(link, index) in iconNavigation" :key="index" class="">
				<nuxt-link
					:to="link.destination"
					class="text-center"
					@click.native="close"
				>
					<svg class="w-8 h-8">
						<use
							:xlink:href="`/images/icons/sprite.svg#icon-${link.icon}`"
						></use>
					</svg>
					<div class="__text">{{ link.name }}</div>
				</nuxt-link>
			</div>
		</div>

		<div class="">
			<div v-for="(link, index) in navigationLinks" :key="index">
				<nuxt-link :to="link.destination" @click.native="close">{{
					link.name
				}}</nuxt-link>
			</div>
		</div>

		<div>
			<h2>Connect</h2>
			<div class="flex space-x-2">
				<svg class="w-6 h-6">
					<use xlink:href="/images/icons/sprite.svg#icon-facebook"></use>
				</svg>
				<svg class="w-6 h-6">
					<use xlink:href="/images/icons/sprite.svg#icon-youTube"></use>
				</svg>
				<svg class="w-6 h-6">
					<use xlink:href="/images/icons/sprite.svg#icon-instagram"></use>
				</svg>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		emits: [],
		props: {
			navigationLinks: {
				type: Array,
				required: true
			}
		},
		computed: {
			iconNavigation() {
				return this.navigationLinks.filter((link) => link.icon)
			}
		},
		methods: {
			close() {
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.drawer {
		align-items: stretch;
		z-index: 99;
	}
</style>
