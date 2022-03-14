<template>
	<div>
		<header class="container aspect-video grid place-items-center pt-16">
			<Suspense>
				<iframe
					ref="vid"
					class="w-full aspect-video"
					:src="`https://www.youtube.com/embed/${message}?modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&theme=light&color=white&controls=1`"
					frameborder="0"
					color="green"
					allowfullscreen
				>
				</iframe>
			</Suspense>
		</header>
		<div>
			{{ messageData.title }}<br />
			{{ messageData.pastor }}<br />
			{{ messageData.date }}<br />
			{{ messageData.description }}<br />
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		message: {
			type: String
		},
		messageData: {
			type: Object
		}
	})
</script>
