<template>
	<div>
		<header
			class="aspect-video grid place-items-center bg-cover bg-center px-4"
			:style="{
				backgroundImage:
					'linear-gradient(to left, rgba(000, 000, 000, 0.00), rgba(000, 000, 000, 0.73)), url(' +
					series.image +
					')'
			}"
		>
			<!-- <div class="text-left container mx-auto text-white mb-16">
				<p class="text-2xl font-light font-extralight tracking-wider">
					{{ subtitle }}
				</p>
				<button class="btn btn-yellow mt-4">Watch Now</button>
			</div> -->
		</header>
		<div class="container">
			<h1>
				{{ series.title }}
			</h1>
			<p>
				{{ series.description }}
			</p>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		series: {
			type: Object
		}
	})
</script>
