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

		<SideMenuTile :head="'Watch Online'">
			<div class="p-4">
				<a
					href="https://revealingtruth.online.church/"
					rel="noopener noreferrer"
					target="_blank"
					class="btn btn-blue w-full text-center inline-block"
					>Watch us live</a
				>
			</div>
		</SideMenuTile>

		<SideMenuTile
			:head="'RTM Mobile App'"
			:subhead="'Wherever you go, take us with you!'"
		>
			<div class="flex space-x-2 p-4">
				<a href="">
					<img
						class="w-full"
						src="https://i.ibb.co/znhc102/app-store.png"
						alt=""
					/>
				</a>
				<a href="" target="_blank" rel="noopener noreferrer">
					<img
						class="w-full"
						src="https://i.ibb.co/FYnwFYQ/google-play.png"
						alt=""
					/>
				</a>
			</div>
		</SideMenuTile>
		<SideMenuTile :image="'/PushpayLogo.jpeg'">
			<div class="p-4">
				<a
					href="https://pushpay.com/login?ReturnUrl=%2fpushpay%2fredirect"
					class="btn btn-yellow w-full text-center inline-block"
					rel="noopener noreferrer"
					target="_blank"
					>Sign In</a
				>
			</div>
		</SideMenuTile>
		<SideMenuTile :head="'Planning Center'">
			<div class="p-4">
				<a
					href="https://revealingtruthdepartments.churchcenter.com/home"
					class="btn btn-yellow w-full text-center inline-block"
					rel="noopener noreferrer"
					target="_blank"
					>Sign In</a
				>
			</div>
		</SideMenuTile>
		<SideMenuTile :head="'Stay Connected to RTM'">
			<SideMenuLink icon="icon-facebook" text="Facebook" :externallink="true" />
			<SideMenuLink
				icon="icon-instagram"
				text="Instagram"
				:externallink="true"
			/>
			<SideMenuLink icon="icon-youTube" text="Youtube" :externallink="true" />
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
