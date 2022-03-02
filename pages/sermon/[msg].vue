<template>
	<div>
		<header class="container aspect-video grid place-items-center pt-16">
			<Suspense>
				<iframe
					ref="vid"
					class="w-full aspect-video"
					:src="`https://www.youtube.com/embed/${currentVideo}?modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&theme=light&color=white&controls=1`"
					frameborder="0"
					color="green"
					allowfullscreen
				>
				</iframe>
			</Suspense>
		</header>
		<div class="bg-dark-900 h-full text-white">
			<div class="container">
				<mediaScroller>
					<div
						v-for="message in messages"
						key="message.id"
						@click="handleClick(message.resourceId)"
					>
						<img :src="message.image" />
					</div>
				</mediaScroller>
			</div>
		</div>
	</div>
</template>

<script setup>
	import mediaScroller from '../../components/ui/mediaScroller.vue'

	import { inject } from 'vue'

	const current = inject('current')
	const messages = inject('messages')
	const currentVideo = ref(messages[0])

	const handleClick = (id) => {
		currentVideo.value = id
	}
</script>
)

<style lang="scss" scoped>
	.main {
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}

	.holder {
		position: relative;
	}

	.overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		width: 100%;
		height: 0;
		transition: 0.5s ease;
		line-height: 0.8;
	}
	.overlay-text {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		width: 100%;
		height: 0;
		transition: 0.6s ease-in-out;
		line-height: 0.8;
	}

	.holder:hover .overlay {
		height: 100%;
	}
	.holder:hover .overlay-text {
		height: 100%;
	}

	.prev {
		top: 50%;
		right: 100%;
		z-index: 10;
	}

	.noShow {
		opacity: 0;

		:hover {
			opacity: 1;
		}
	}

	.next {
		color: white;
		left: 98%;
		top: 50%;
		opacity: 0;
		font-size: 2rem;
		cursor: pointer;
		z-index: 10;

		&:hover {
			opacity: 1;
		}
	}
	.prev {
		color: white;
		right: 98%;
		top: 50%;
		opacity: 0;
		font-size: 2rem;
		cursor: pointer;
		z-index: 10;

		&:hover {
			opacity: 1;
		}
	}
</style>
