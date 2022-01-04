<template>
	<div>
		<div class="max-w-screen-lg mx-auto mt-4 px-4">
			<MainCard
				bg-img="https://firebasestorage.googleapis.com/v0/b/revealing-truth-website.appspot.com/o/Images%2FHeroPastors.jpg?alt=media&token=c9e86338-7ce5-4b23-8619-0fc2136354a2"
			/>
		</div>
		<ThreeCol class="mt-4 px-4">
			<template #left
				><MainTile
					bg-img="https://images.unsplash.com/photo-1625571281240-694bfa82e4c9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
					title="Love Sealed by Action:"
					subtitle="What Love Produces"
					subtext="Some subtext will go here giving more context to the main
        header."
					:link="'/getinvolved'"
				/>
				<MainTile
					bg-img="https://images.unsplash.com/photo-1625571281240-694bfa82e4c9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
					title="Love Sealed by Action:"
					subtitle="What Love Produces"
					subtext="Some subtext will go here giving more context to the main
        header."
					:link="'/getinvolved'"
				/>
				<MainTile
					bg-img="https://images.unsplash.com/photo-1625571281240-694bfa82e4c9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
					title="Love Sealed by Action:"
					subtitle="What Love Produces"
					subtext="Some subtext will go here giving more context to the main
        header."
					:link="'/getinvolved'"
				/>
			</template>
			<template #right>
				<SideMenu />
			</template>
		</ThreeCol>
	</div>
</template>

<script setup>
	import ThreeCol from '../components/layoutUtils/threeCol.vue'
	import MainTile from '../components/MainTile.vue'
	import SideMenu from '../components/sidemenu/SideMenu.vue'
</script>

<style></style>
