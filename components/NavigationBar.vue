<template>
	<header :class="{ 'scrolled-nav': scrolledNav }">
		<nav>
			<nuxt-link :to="{ name: 'index' }" class="branding">
				<svg class="logo">
					<use :xlink:href="'/images/icons/sprite.svg#icon-logo'"></use>
				</svg>

				<div class="text-blue-gray-50">RTM</div>
			</nuxt-link>

			<ul v-show="!mobile" class="navigation text-blue-gray-50">
				<li v-for="(link, index) in navigationLinks" :key="index">
					<a :href="link.destination" v-if="link.external">{{ link.name }}</a>
					<nuxt-link
						:to="link.destination"
						class="link"
						v-if="!link.external"
						>{{ link.name }}</nuxt-link
					>
				</li>
			</ul>
			<div class="icon">
				<i
					@click="toggleMobileNav"
					v-show="mobile"
					class="far fa-bars"
					:class="{ 'icon-active': mobileNav }"
				></i>
			</div>
			<transition name="mobile-nav">
				<div v-show="mobileNav" class="dropdown-nav">
					<button class="" @click="toggleMobileNav">Close</button>
					<button class="" href="/">Watch Now</button>

					<!-- <div class="flex justify-between space-x-3">
						<div v-for="(link, index) in iconNavigation" :key="index" class="">
							<nuxt-link :to="link.destination" class="text-center">
								<svg class="w-8 h-8">
									<use
										:xlink:href="`/images/icons/sprite.svg#icon-${link.icon}`"
									></use>
								</svg>
								<div class="__text">{{ link.name }}</div>
							</nuxt-link>
						</div>
					</div> -->

					<div class="">
						<div v-for="(link, index) in navigationLinks" :key="index">
							<nuxt-link :to="link.destination">{{ link.name }}</nuxt-link>
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
			</transition>
		</nav>
	</header>
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

<script setup>
	import { ref, onMounted, onUpdated, computed } from 'vue'

	const scrolledNav = ref(null)
	const mobile = ref(false)
	const mobileNav = ref(false)
	const windowWidth = ref(null)

	const toggleMobileNav = () => {
		mobileNav.value = !mobileNav.value
	}

	onMounted(() => {
		const checkScreen = () => {
			windowWidth.value = window.innerWidth
			if (windowWidth.value <= 1050) {
				mobile.value = true
				return
			}
			mobile.value = false
			mobileNav.value = false
			return
		}

		const updateScroll = () => {
			const scrollPosition = window.scrollY
			if (scrollPosition > 50) {
				scrolledNav.value = true
				return
			}
			scrolledNav.value = false
		}

		window.addEventListener('scroll', updateScroll)

		window.addEventListener('resize', checkScreen)
		checkScreen()
	})
</script>

<style lang="scss" scoped>
	header {
		@apply bg-secondary z-40 w-full fixed;
		transition: 0.5s ease all;

		nav {
			@apply relative flex p-4 mx-auto;
			transition: 0.5s ease all;
			width: 90%;

			@media (min-width: 1140px) {
				max-width: 1140px;
			}

			ul,
			.link {
				font-size: 12px;
				font-weight: 500;
				color: #fff;
				list-style: none;
				text-decoration: none;
			}

			li {
				@apply uppercase p-4 ml-4;
			}

			.link {
				transition: 0.5s ease all;
				padding-bottom: 4px;
				border-bottom: 1px solid transparent;

				&:hover {
					@apply text-accent border-accent;
				}
			}

			.branding {
				@apply flex;
				align-items: center;

				.logo {
					@apply h-12 w-12 fill-[#fff];
				}
			}

			.navigation {
				@apply flex flex-1 items-center justify-end;
			}

			.icon {
				@apply flex items-center absolute top-0 h-full;
				right: 24px;

				i {
					cursor: pointer;
					color: #fff;
					font-size: 20px;
					transition: 0.8s ease all;
				}
			}

			.icon-active {
				transform: rotate(180deg);
			}

			.dropdown-nav {
				@apply flex flex-col fixed top-0 right-0 w-full h-full max-w-sm;
				background-color: #fff;
			}

			.mobile-nav-enter-active,
			.mobile-nav-leave-active {
				transition: 1s ease all;
			}

			.mobile-nav-enter-from,
			.mobile-nav-leave-to {
				transform: translateX(100%);
			}
			.mobile-nav-enter-to {
				transform: translateX(0);
			}
		}
	}
	.scrolled-nav {
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);

		nav {
			padding: 8px 0;

			.branding {
				align-items: center;

				.image {
					@apply h-10 w-10;
					box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
						0 2px 4px -1px rgba(0, 0, 0, 0.06);
				}
			}
		}
	}
</style>
