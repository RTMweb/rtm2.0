<template>
	<div class="space-y-8">
		<SideMenuTile
			:head="'Get Involved'"
			:subhead="'See what God can do through you.'"
		>
			<SideMenuLink
				icon="icon-Truth-Connections"
				text="Truth Connections"
				:externallink="false"
			/>
			<SideMenuLink
				icon="icon-volunteer"
				text="Volunteer"
				:externallink="false"
			/>
			<SideMenuLink
				icon="icon-heart-moniter"
				text="Outreach"
				:externallink="false"
			/>
			<SideMenuLink
				icon="icon-ministry-groups"
				text="Ministry Groups"
				:externallink="false"
			/>
			<SideMenuLink icon="icon-heart" text="Giving" :externallink="true" />
		</SideMenuTile>

		<SideMenuTile
			:head="'RTM Mobile App'"
			:subhead="'Wherever you go, take us with you!'"
		>
			<div class="flex space-x-2">
				<img
					class="w-full"
					src="https://i.ibb.co/znhc102/app-store.png"
					alt=""
				/>
				<img
					class="w-full"
					src="https://i.ibb.co/FYnwFYQ/google-play.png"
					alt=""
				/>
			</div>
		</SideMenuTile>
		<SideMenuTile :image="'/PushpayLogo.jpeg'">
			<a href="" class="btn btn-yellow">Sign In</a>
		</SideMenuTile>
	</div>
</template>

<script>
	import SideMenuLink from './SideMenuLink.vue'
	import SideMenuTile from '~/components/sidemenu/SideMenuTile.vue'
	export default {
		components: {
			SideMenuTile,
			SideMenuLink
		}
	}
</script>
