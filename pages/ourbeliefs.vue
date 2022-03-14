<template>
	<dir v-for="slide in slides" key="slide">
		<p>{{ slide }}</p>
	</dir>
</template>

<script setup>
	import { ref } from 'vue'

	const slides = ref([
		'After death, eternal life continues either in heaven or hell, based on your decision to make Jesus Christ your Lord and Savior. When the Rapture occurs, the dead in Christ will rise first, and then those who are alive and remain (those who have accepted Jesus as their Lord and Savior) will be caught up to meet Him in the air.',

		'That Jesus Christ is the Son of God, was crucified, died, and buried. On the third day, He rose from the dead, and later ascended into heaven, where He remains at the right hand of God Almighty.',

		'The Bible was written and inspired by God.',

		'Faith is a practical response to the Word of God.',

		'In water baptism in the name of the Father, Son, and Holy Spirit.',

		'In the authority of Jesus’ name.',

		'In the indwelling and baptism of the Holy Spirit with the evidence of speaking in tongues.',

		'In tithes and offerings as a form of Worship unto God; as a gift that is freely given.',

		'In divine healing—the restoration of health to those who believe and act on the truths written in God’s Word. We further believe that Jesus is our Healer, and that by His stripes, we are already healed.',

		'The local church is the place of membership where God has called you to receive His Word on a consistent basis and to grow spiritually.',

		'In giving alms to the poor, sick, homeless, and others in despair.'
	])
</script>
