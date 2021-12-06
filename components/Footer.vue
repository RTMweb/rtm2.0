<template>
	<footer class="hidden sm:block container mx-auto">
		<div class="flex">
			<div>
				<h4>PHYSICAL AND MAILING ADDRESS:</h4>
				<p>
					<span>Tampa Campus:</span>
					5201 N. Armenia Ave. Tampa, FL 33603
				</p>
				<p>
					P: 813-354-1135<br />
					E: inquiries@revealingtruth.org
				</p>
				<h4>Connect with us</h4>
				<div class="flex">
					<svg class="icon">
						<use xlink:href="/images/icons/sprite.svg#icon-facebook"></use>
					</svg>
					<svg class="icon">
						<use xlink:href="/images/icons/sprite.svg#icon-instagram"></use>
					</svg>
					<svg class="icon">
						<use xlink:href="/images/icons/sprite.svg#icon-youTube"></use>
					</svg>
					<svg class="icon">
						<use xlink:href="/images/icons/sprite.svg#icon-vimeo"></use>
					</svg>
				</div>
			</div>
			<div>
				<h4>Revealing Truth Ministries</h4>
				<p>
					We are Revealing Truth Ministries - Where lives are changed,
					communities are impacted and Christ is put on display through the
					Simple Truth of God’s Word.
				</p>
			</div>
			<div>
				<h4>Upcoming Events</h4>
				<button class="btn">Events</button>
			</div>
		</div>
		<div class="flex">
			<nuxt-link to="/" class="flex items-center">
				<svg class="h-10 w-10">
					<use xlink:href="/images/icons/sprite.svg#icon-logo"></use>
				</svg>
				<div>Revealing Truth Ministries</div>
			</nuxt-link>
			<p>
				Revealing Truth Ministries Christian Center | RTM Nation | Embracing
				Legacy | Copyright All Rights Reserved © 2021
			</p>
		</div>

		<div class="flex">
			<nuxt-link
				v-for="(link, index) in navigationLinks"
				:key="index"
				:to="link.destination"
				>{{ link.name }}</nuxt-link
			>
		</div>
	</footer>
</template>

<script>
	export default {
		props: {
			navigationLinks: {
				type: Array,
				required: true
			}
		}
	}
</script>

<style lang="scss">
	.icon {
		@apply h-4 w-4;
	}
</style>
