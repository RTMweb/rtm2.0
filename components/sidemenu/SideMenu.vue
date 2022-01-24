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
				to="/getinvolved"
			/>
			<SideMenuLink
				icon="icon-volunteer"
				text="Volunteer"
				:externallink="false"
				to="/getinvolved"
			/>
			<SideMenuLink
				icon="icon-heart-moniter"
				text="Outreach"
				:externallink="false"
				to="/getinvolved"
			/>
			<SideMenuLink
				icon="icon-ministry-groups"
				text="Ministry Groups"
				:externallink="false"
				to="/getinvolved"
			/>
			<SideMenuLink
				icon="icon-heart"
				text="Giving"
				:externallink="true"
				to="https://pushpay.com/g/revealingtruth?appVersion=&clickOrigin=&itemId=&utm_medium=social&utm_source=linktree&utm_campaign=giving&ltclid=6bff1693-6209-48cf-92f2-4ad8dc377d3c"
			/>
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
				<a
					href="https://apps.apple.com/us/app/revealing-truth/id1445042097?mt=8"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						class="w-full"
						src="https://i.ibb.co/znhc102/app-store.png"
						alt=""
					/>
				</a>
				<a
					href="https://play.google.com/store/apps/details?id=io.pushpay.revealingtruth&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
					target="_blank"
					rel="noopener noreferrer"
				>
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
			<SideMenuLink
				icon="icon-facebook"
				text="Facebook"
				:externallink="true"
				to="https://www.facebook.com/revealingtruth/"
			/>
			<SideMenuLink
				icon="icon-instagram"
				text="Instagram"
				:externallink="true"
				to="https://www.instagram.com/revealingtruth/?hl=en"
			/>
			<SideMenuLink
				icon="icon-youTube"
				text="Youtube"
				:externallink="true"
				to="https://www.youtube.com/user/RevealingTruthOnline"
			/>
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
