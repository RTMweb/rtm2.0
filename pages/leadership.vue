<template>
	<div class="container">
		<div>
			<h1>Leadership</h1>
			<NuxtLink to="/about">More about Revealing Truth Ministries</NuxtLink>
		</div>
		<div v-for="pastor in pastors" key="pastor.id">
			<div class="grid grid-row md:grid-cols-[1fr,2fr]">
				<div class="relative rounded-full h-80 w-80 overflow-hidden">
					<img
						src="/HeroPastors.jpeg"
						class="absolute object-cover object-center min-h-full w-auto h-auto"
						alt=""
					/>
				</div>
				<div>
					<h2>{{ pastor.name }}</h2>
					<h2>{{ pastor.location }}</h2>
					<p>
						{{ pastor.description }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue'

	const pastors = ref([
		{
			id: 1,
			image: '/HeroPastors.jpeg',
			name: 'Bryan & Rashida Powe',
			description:
				'Pastors Bryan and Rashida Powe are the senior pastors of Revealing Truth Ministries (RTM) in Tampa, Florida. It is their honor to serve the men, women, children and supporters of Revealing Truth Ministries along with Pastor Deborah Powe, the overseer and Pastor Bryan’s mother. They are the proud parents of one beautiful daughter, Amber.',
			location: 'Tampa Campus'
		},
		{
			id: 2,
			image: '/HeroPastors.jpeg',
			name: 'Pastor Deborah H. Powe',
			description:
				'Pastor Deborah was ordained in ministry on December 8, 1988, after having been trained and serving faithfully at World Changers Church International under the leadership of Pastors Creflo and Taffi Dollar. For more than 35 years, she has been committed to serving God’s people and teaching Biblical truths locally, nationally and internationally.',
			location: 'Overseer'
		},
		{
			id: 3,
			image: '/HeroPastors.jpeg',
			name: 'Lamar & Yeneka Mills',
			description:
				'Pastors Lamar and Yeneka Mills take great pleasure in serving as Campus Pastors for Revealing Truth Ministries in the beautiful city of St. Petersburg Florida. They are known for passionately teaching the Word of God with simplicity and understanding. They are devoted to meeting the needs of children and their families and building leaders and making disciples',
			location: 'St Pete Campus'
		},
		{
			id: 4,
			image: '/HeroPastors.jpeg',
			name: 'Benjamin & Greta Smith',
			description:
				'Pastors Benjamin and Greta Smith oversee the Revealing Truth Ministries Wesley Chapel campus and became campus pastors in 2017. They have been members of Revealing Truth Ministries for more than 20 years and, prior to becoming pastors at Wesley Chapel, supported many ministry functions, including directing youth ministry for all youth ages, nursery through college. The Smiths are happily married (over 30 years now and still going strong), loving parents to their adult children, active grandparents, and proud godparents. One of their core objectives in life is to help all families be better.',
			location: 'Wesley Chapel Campus'
		}
	])
</script>

<style></style>
