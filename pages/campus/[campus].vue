<template>
	<div>
		<div class="h-md bg-primary">{{ place }}</div>
		<div class="container mx-auto grid grid-cols-2">
			<div>
				<div>
					Times<br />
					<br />
				</div>
				<div>Location Info<br /></div>
				<div>
					Campus Pastors<br />
					<pre>
					{{ campus.pastors }}
					</pre
					>
				</div>
			</div>
			<div>
				<div>Video</div>
				<div>Campus Pastors<br /></div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, reactive, computed } from 'vue'

	import { useRoute } from 'vue-router'
	const route = useRoute()

	const Location = ref([
		{
			id: 'tampa',
			name: 'Tampa, FL Campus',
			address: '5201 North Armenia Ave 33603',
			maplink:
				'https://www.google.com/maps?daddr=Revealing+Truth+Ministries/@27.9939396,-82.4855715',
			iconcolor: '#0060A6',
			icon: 'TC',
			picture:
				'https://firebasestorage.googleapis.com/v0/b/revealing-truth-website.appspot.com/o/Images%2FRTMAboutbkgrd.png?alt=media&token=270a8277-176b-4f75-ab2c-ff369852695e',
			video: 'static/Tampa.mp4',
			pastors: 'Bryan & Rashida Powe',
			email: 'web@revealingtruth.org',
			times: [
				{ day: 'Sunday', time: '9:00 am' },
				{ day: 'Wednesday', time: '7:00 pm' }
			],
			title: 'SENIOR PASTORS',
			information: `<p>Pastors Bryan and Rashida Powe are the senior pastors of Revealing Truth Ministries
	     Christian Center (RTM) in Tampa, Florida. They are honored to
	     serve the men, women, families and supporters of Revealing Truth Ministries with
	     Pastor Deborah Powe, the overseer of RTM and Pastor Bryan’s mother. Based upon
	     God’s promise in Jeremiah 33:6 (Amplified), the vision of RTM is to reveal God’s
	     abundance of peace, prosperity, security, stability, health, healing and truth in the lives
	     of believers.</p>

	         <p>They are dedicated to bringing God’s message of wholeness, represented by the
	         seven pillars of RTM’s vision, in the lives of others. Through their teaching, Pastors
	         Bryan & Rashida’s desire is for others to experience a true relationship with God,
	         growing in their understanding of God’s grace, love and goodness. Their heart is to
	         equip every member with an understanding of their part as servants, family members,
	         employees, neighbors, business owners and leaders in ensuring that no person God
	         has given them influence over is left incomplete.</p>

	         <p>For Pastors Bryan & Rashida, the focus of every department, outreach mission,
	         conference and event of RTM is simple: “We may not do everything, but everything we
	         do connects deeply to who we are.” Therefore, whether connecting with Revealing Truth
	         Ministries through an extended campus in the Tampa Bay area (Wesley Chapel, FL,
	         and St. Petersburg, FL), an online service, social media, Global Missions and Outreach
	         (Creative Kids, Love Sealed by Action and Living Legacy), the youth-focused
	         Embracing Legacy community organization or another aspect of the vision, people can
	         expect to join with a body of believers committed to introducing wholeness so that they
	         can daily walk in the finished works of Jesus.</p>`,
			photo:
				'https://firebasestorage.googleapis.com/v0/b/revealing-truth-website.appspot.com/o/Images%2FPastors%2FPastorBryan.png?alt=media&token=18fca58c-54ec-4345-b289-7262ecfdd01e'
		},
		{
			id: 'wesleychapel',
			name: 'Wesley Chapel, FL Campus',
			address: '2644 Cypress Ridge Blvd 33544',
			maplink:
				'https://www.google.com/maps?daddr=2644+Cypress+Ridge+Blvd.,+Wesley+Chapel,+FL+33544',
			iconcolor: '#939393',
			icon: 'WC',
			picture: 'https://i.ibb.co/W2y97tC/WCAboutbkgrd.png',
			video: 'static/WesleyChap.mp4',
			pastors: 'Benjamin & Greta Smith',
			email: 'web@revealingtruth.org',
			times: [{ day: 'Sunday', time: '9:00 am' }],
			title: 'WESLEY CHAPEL CAMPUS PASTORS',
			information:
				'<p>Pastors Benjamin and Greta Smith oversee the Revealing Truth Ministries Wesley Chapel campus and became campus pastors in 2017. They have been members of Revealing Truth Ministries for more than 20 years and, prior to becoming pastors at Wesley Chapel, supported many ministry functions, including directing youth ministry for all youth ages, nursery through college. The Smiths are happily married (over 30 years now and still going strong), loving parents to their adult children, active grandparents, and proud godparents. One of their core objectives in life is to help all families be better.</p>',
			photo:
				'https://firebasestorage.googleapis.com/v0/b/revealing-truth-website.appspot.com/o/Images%2FPastors%2FWCLeaders.png?alt=media&token=1354e67c-28ba-4f86-845d-2b1606b320f2'
		},
		{
			id: 'St-Petersburg-Campus',
			name: 'St Petersburg, FL Campus',
			address: '701 16th Street South 33705',
			maplink:
				'https://www.google.com/maps?daddr=701+16th+St+S,+St.+Petersburg,+FL+33705',
			iconcolor: '#D9E021',
			icon: 'SC',
			picture: 'https://i.ibb.co/jr3NQbP/st-petersburg.jpg',
			video: 'static/STPETE.mp4',
			pastors: 'Lamar & Yeneka Mills',
			email: 'web@revealingtruth.org',
			times: [{ day: 'Sunday', time: '9:00 am' }],
			title: 'ST PETE CAMPUS PASTORS',
			information: `<p>Pastors Lamar and Yeneka Mills take great pleasure in serving as Campus Pastors for
		    Revealing Truth Ministries in the beautiful city of St. Petersburg Florida. They are
		    known for passionately teaching the Word of God with simplicity and understanding.
		    They are devoted to meeting the needs of children and their families and building leaders and making disciples</p>

		    <p>Pastor Lamar is a native of St. Petersburg, Florida. After graduating from Lakewood
		    High School, he attended Oral Roberts University and Clark Atlanta University where he
		    diligently pursued the call of God for his life. Pastor Yeneka is a native of Myrtle Beach,
		    South Carolina and after graduating from Myrtle Beach High School, she attended
		    Voorhees College where she attained a degree in Political Science, and at the young
		    age of 24, she received Jesus Christ as the Lord of her life. She relocated to Tampa,
		    Florida in 2005.</p>

		    <p>In 2005, God led each of them to join Revealing Truth Ministries. After joining, they
		    served in various ministries, including Intercessory Prayer, New Member Orientation,
		    and Youth ministries. In 2012, God blessed the union of Lamar and Yeneka and they
		    were married on the 25th day of February. After their union, Lamar resumed his career
		    with Pinellas County Schools and Yeneka continued her career as a County Land Use
		    Planner with Hillsborough County. They have been married for eight years and are the
		    proud parents of two beautiful and uniquely gifted daughters, Taylor (17) and Mckenzie
		    (7). </p>

		    <p>In the summer of 2017, Lamar and Yeneka begin serving as the Revealing Truth Ministries St Petersburg Campus Pastors. Since the relaunch of the Campus, they have
		    had the pleasure of leading a faithful group of men and women of God in meeting the
		    needs of children and their families through partnerships with local day care centers and
		    elementary schools.</p>

		    <p>Pastor Lamar enjoys equipping and developing leaders into becoming disciple makers.
		    His genuine desire to develop others into using their God-given gifts is extremely valuable to the Kingdom of God. Pastor Yeneka’s humbleness, passion for the things of
		    God and her desire to see others grow in Christ are tremendous assets. They are exemplary leaders developing other leaders into strong and mighty warriors for the Body
		    of Christ.</p>`,
			photo:
				'https://firebasestorage.googleapis.com/v0/b/revealing-truth-website.appspot.com/o/Images%2FPastors%2FMills.png?alt=media&token=d1cceac5-8677-4339-9328-b428c6076571'
		}
	])

	const place = ref('')
	place.value = route.params.campus

	const campus = computed(() => {
		let places = ref()
		places.value = Location.value

		places.value = places.value.filter((loc) => {
			return loc.id === route.params.campus
		})

		return places.value[0]
	})
</script>
