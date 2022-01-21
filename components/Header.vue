<template>
	<header
		class="h-xl grid place-items-end bg-cover bg-center px-4"
		:style="{
			backgroundImage:
				'linear-gradient(to bottom, rgba(000, 000, 000, 0.00), rgba(000, 000, 000, 0.73)), url(' +
				img +
				')'
		}"
	>
		<div class="text-center container mx-auto text-white mb-16">
			<h1 class="text-6xl font-bold">
				{{ title }}
			</h1>
			<p class="text-2xl font-light font-extralight tracking-wider">
				{{ subtitle }}
			</p>
			<button class="btn btn-yellow mt-4">Our Leadership</button>
		</div>
	</header>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: null
			},
			subtitle: {
				type: String,
				default: null
			},
			img: {
				type: String,
				default: null
			}
		}
	}
</script>

<style></style>
