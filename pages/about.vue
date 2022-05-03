<template>
	<div>
		<Header
			:title="'We Believe In Simple Truth:'"
			:subtitle="'We believe that truth makes a mark in people’s lives that can never be erased.'"
			:img="'/about.jpg'"
		/>

		<section class="bg-cool-gray-100">
			<div
				class="container grid grid-cols-1 px-4 md:(grid-cols-3 mx-auto) py-20 gap-4"
			>
				<div>
					<h3>Our Beliefs</h3>
					<p>
						We believ in Simple Truth. Truth - In everyday language, it’s
						defined as being in one accord with fact or reality. Reality can
						change. Facts are temporal. For Believers, Truth is much more than
						that. Truth does not change. Truth just is - regardless of what the
						world deems as fact or reality today. Why? Because we believe that
						Truth is only found in the Word of God - it does not change and it
						just is.
					</p>
					<nuxtLink to="/ourbeliefs">Our Beliefs</nuxtLink>
				</div>
				<div>
					<h3>Our Values</h3>
					<p>
						We affectionately Value: Peace which is our reward because we accept
						Christ in our hearts; Prosperity which is our privilege because
						giving is our attitude; Security which is our stance because we
						reside in His presence; Stability which is our posture because we
						believe in the finished work of Jesus Christ; Health which is our
						divine right because the Word is our medication. Healing which is
						our culture because love is our resource; Truth which is our message
						and Jesus, who is our way.
					</p>
					<nuxtLink to="/ourvalues">Our Values</nuxtLink>
				</div>
				<div>
					<h3>Our Leadership</h3>
					<p>
						Revealing Truth Ministries believes that truth, which is the Word of
						God, causes people to experience God’s abundance in every area of
						their lives. We believe truth transforms people into who God
						destined them to be.
					</p>
					<nuxtLink to="/leadership">Our leadership</nuxtLink>
				</div>
			</div>
		</section>
		<section class="py-20">
			<h2
				class="mx-auto max-w-[600px] text-center text-secondary text-5xl font-bold mb-10"
			>
				Explore Our Vision
			</h2>
			<VisionSlider />
		</section>
	</div>
</template>

<script setup scoped>
	import ThreeCol from '../components/layoutUtils/threeCol.vue'
	import MainTile from '../components/MainTile.vue'
	import SideMenu from '../components/sidemenu/SideMenu.vue'
</script>

<style lang="scss"></style>
