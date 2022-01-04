<template>
	<div class="max-w-screen-lg mx-auto">
		<div class="grid grid-cols-3 gap-4">
			<div class="col-span-full md:col-span-2 space-y-4">
				<slot name="left"></slot>
			</div>
			<div class="col-span-full md:col-span-1">
				<slot name="right"></slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default {}
</script>

<style lang="scss"></style>
