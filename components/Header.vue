<template>
	<header class="h-md bg-red-500 grid place-items-center">
		<div class="text-center container mx-auto">
			<h1>
				{{ title }}
			</h1>
			<p>
				{{ subtitle }}
			</p>
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
			}
		}
	}
</script>

<style></style>
