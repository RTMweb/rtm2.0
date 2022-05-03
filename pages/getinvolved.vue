<template>
  <div>
    <div>
      <Header title="Get Involved Page" subtitle="Get Involved Page Subtitle" />
    </div>
    <div class="container grid grid-cols-2 gap-8 mt-8">
      <figure v-for="card in cards" key="card.heading">
        <img :src="card.img" alt="" class="rounded-xl" />
        <h3>{{ card.heading }}</h3>
        <p>
          {{ card.text }}
        </p>
      </figure>
    </div>
  </div>
</template>

<script setup>
const cards = ref([
  {
    img: "/blueprint.jpg",
    heading: "People Groups",
    text:
      "The People’s Group of Revealing Truth Ministries (RTM) serves each member at each stage of life. In addition to the dynamic word brought forth in the main sanctuary, we offer a mirroring experience for the children and youth that we have the opportunity to serve.",
  },
  {
    img: "/blueprint.jpg",
    heading: "Life Groups",
    text:
      "Life Group is the lifeline of Revealing Truth Ministries (RTM). We come in contact with everyone who attends a service, from the moment they step through the front door until the time they exit, to make sure that all guests and members understand and receive all RTM has to offer.",
  },
  {
    img: "/blueprint.jpg",
    heading: "Creative Arts",
    text:
      "The Creative Arts team sets an energetic and harmonious atmosphere of praise & worship through performing and visual artistic expression. We are the look, feel, sound and heartbeat of the vision.",
  },
  {
    img: "/blueprint.jpg",
    heading: "Outreach",
    text:
      "The Outreach Group at Revealing Truth Ministries (RTM) is the hands and feet of the ministry. We do just as the Word of God says by embodying the scripture that says “We are the church” (I Corinthians 6:19) and delivering the good news of who God is to them where they are in the community (and abroad).",
  },
  {
    img: "/blueprint.jpg",
    heading: "Support Groups",
    text:
      "The Revealing Truth Ministries (RTM) Support Group is the heartbeat of RTM. We are behind the scenes warriors committed to serving and perfecting the vision of the ministry. We are unified through our many strengths and bound together in the common pursuit to uphold and preserve the integrity of the ministry.",
  },
]);
</script>

<style lang="scss"></style>
