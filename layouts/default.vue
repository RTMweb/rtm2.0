<template>
  <div class="mainlayout">
    <NavigationBar :navigation-links="navigationLinks" />
    <div :style="{ marginTop: 5 + 'rem' }" class="">
      <KeepAlive>
        <slot></slot>
      </KeepAlive>
    </div>

    <!-- <Footer :navigation-links="navigationLinks" /> -->
  </div>
</template>

<script setup>
import { provide, ref } from "vue";
const navigationLinks = ref([
  {
    name: "about",
    destination: "/about",
    icon: "",
    external: false,
  },

  {
    name: "get involved",
    destination: "/getinvolved",
    icon: "man",
    external: false,
  },
  {
    name: "locations",
    destination: "/locations",
    icon: "place",
    external: false,
  },
  {
    name: "sermons",
    destination: "/sermon",
    icon: "play",
    external: false,
  },
  {
    name: "giving",
    destination:
      "https://pushpay.com/g/revealingtruth?appVersion=&clickOrigin=&itemId=&utm_medium=social&utm_source=linktree&utm_campaign=giving&ltclid=6bff1693-6209-48cf-92f2-4ad8dc377d3c",
    icon: "heart-two",
    external: true,
  },
]);

const series = ref([
  {
    id: "PLnoMLl1eIRc5iPhyX6NqVPFXPCpz7WyUP",
    description: `There are things that will ONLY happen IF you forgive." - Pastor Bryan Powe

Welcome to the INSTITUTE of FORGIVENESS!  During the course of this series, we will explore and come to learn:
- The NATURE of forgiveness
- What is RELEASED when we forgive
- The role of RESTORATION in forgiveness

Everyone has a thought about forgiveness - what it is; what it isn’t; who it’s for; who benefits from it; how to do it; if it’s healthy; if it’s not.  A discussion about forgiveness can get complex fast because of how we each see it, which is often not like Jesus sees it.  We look at people and their track record instead of at Jesus and His!  But, if we are to be built to last, we must know that we are built to FORGIVE like Jesus.`,
    image: "/images/PLnoMLl1eIRc5iPhyX6NqVPFXPCpz7WyUP.jpg",
    title: "Only If",
    slug: "only-if",
  },
  {
    id: "PLnoMLl1eIRc4xLt5yalXQVGiybznE9xn-",
    description: `It is impossible to be built to last if you've been programmed to quit." - Pastor Bryan Powe
This series is about commitment - our commitment to:
- People
- Purpose

Many people come to God looking for a particular solution to a particular problem.  They want a better marriage or their children to be saved or healing.  They want a better relationship with people or they want to know and understand their purpose.  What happens when you get your answer?  What happens when you don't?  Oftentimes, people quit!  They quit on God because they don't get their solution - still sick or get divorced - or they quit because they DID - I'm good now; I got what I came for.

What makes a person not quit on God when they haven't gotten their answer yet?  What makes them stick with Him when it takes longer than they thought?  What makes her stay with God after EVERYTHING she asked for is received and more?`,
    image: "/images/PLnoMLl1eIRc4xLt5yalXQVGiybznE9xn-.jpg",
    title: "Till Death do us part",
    slug: "till-death-do-us-part",
  },
  {
    id: "PLnoMLl1eIRc7DGl_foqDLYb3Twly4ITFf",
    description: `How are you going to be built to last if you don’t know what you’ve been built to do." - Pastor Bryan Powe

This series is about responding to the call of Jesus on our lives.  But, before we can respond, we have to know HOW He calls.  We have to understand WHAT we have been built to do.

Once we identify that we have been called, we will build our confidence to answer by understanding:

- We have been EQUIPPED.
- We have been ASSIGNED.
- We have been RELEASED`,
    image: "/images/PLnoMLl1eIRc7DGl_foqDLYb3Twly4ITFf.jpg",
    title: "Roll Call",
    slug: "roll-call",
  },
  {
    id: "PLnoMLl1eIRc7b1lV_s-10W3Enl1q1GuoY",
    description: `Truth is… Just because we don't see God moving doesn’t mean He isn’t active. - Pastor Bryan Powe

Although our emotions may be up and down, God never wavers about how He sees things. He is constant. He is a firm foundation. He has built us to last and endure all things in relentless obedience to Him.

So why do we worry?  How do we know what to do when we don't know what to do?  How can we be okay when we're not okay?  

Don't Worry Stay Ready will reveal those answers and more!`,
    image: "/images/PLnoMLl1eIRc7b1lV_s-10W3Enl1q1GuoY.jpg",
    title: "Don'\t Worry Stay Ready! Description",
    slug: "dont-worry-stay-ready",
  },
  {
    id: "PLnoMLl1eIRc7M2q48ZyGlwJQ4fn1FsRzr",
    description: `Our theme for 2021 is Built to Last.

These messages from our Senior Pastor, Overseeing Pastor and Campus Pastors will help us connect with, confirm what God has been sharing with us personally and give clarity to some of the most common questions we all face:

- What are we building?
- Who are we building for?
- Who are we building with?
- Where are we building?
- What does building something to last feel like and look like?

These messages are full of practical, personal and powerful words to change the trajectory of your family and those you come in contact with.`,
    image: "/images/PLnoMLl1eIRc7M2q48ZyGlwJQ4fn1FsRzr.jpg",
    title: "Built to last",
    slug: "built-to-last",
  },
  {
    id: "PLnoMLl1eIRc4493JoX452LtupLdHRBH_P",
    description: `What would Jesus do.  No, really, what would Jesus do?  It’s not just a trendy question to wear around your wrist or put on the back of your car.  It’s a very real question that we need a very real answer for.  How will we perceive that God is doing a new thing?   How will we move from ‘I think it was God’ to ‘I know it was God’?  How can we get involved in what God is doing if we don’t know what He would do - what’s in His nature to do?  If we are to be built to last, we must know what we are built to do - which is to be like Christ.  And to be like Him, we must think like Him and see things like Him.  We must take a deeper dive into the Master’s Mind!`,
    image: "/images/PLnoMLl1eIRc4493JoX452LtupLdHRBH_P.jpg",
    title: "Mastermind Intensive",
    slug: "mastermind-intensive",
  },
  {
    id: "PLnoMLl1eIRc6mzQQn5PbsvobR6-Xl02oE",
    description: `“Everything that God has promised will manifest... SOON ENOUGH.” - Pastor Bryan Powe

Sitting on the bench.  Knowing you are full of promise.  Knowing what you are built for. Knowing you heard from God.  But waiting.  Waiting to be used in a way that matches what you saw. Just waiting.  Ready to get to work.  Anxious to get to work.  Willing to get to work.  But waiting.  

What do you do while you wait?  What if your willingness to wait must be transformed into a willingness to be...ANYTHING.  A willingness to do… ANYTHING.`,
    image: "/images/PLnoMLl1eIRc6mzQQn5PbsvobR6-Xl02oE.jpg",
    title: "Soon Enough",
    slug: "soon-enough",
  },
  {
    id: "PLnoMLl1eIRc6mMrN3Tq5BbVREowKsiP2e",
    description: `Is there one who is willing to respond to the call to Contend for the Faith?  Are you the one? 

"Beloved, although I was very eager to write to you about our common salvation, I found it necessary to write appealing to you to contend for the faith that was once for all delivered to the saints." (Jude 1:3 ESV)

#2022 #Contend #RTMNation`,
    image: "/images/PLnoMLl1eIRc6mMrN3Tq5BbVREowKsiP2e.jpg",
    title: "Contend 22",
    slug: "contend-22",
  },
]);

const locations = ref([
  {
    campus: "Tampa, FL Campus",
    times: [
      {
        day: "Sunday",
        time: "9:00 AM",
      },
      {
        day: "Sunday",
        time: "11:00 AM",
      },
    ],
    pastors: "Bryan and Rashida Powe",
    image: "",
    video: "",
  },
]);

const hometiles = ref([
  {
    title: "",
    subtitle: "",
    smalltitle: "",
    bgimg:
      "https://ik.imagekit.io/cpds/Copy_of_RTM_Announcements___Backgrounds__64__r8Q6887yu.png",
    link: "https://revealingtruthdepartments.churchcenter.com/people/forms/148441",
    view: "true",
  },
  {
    title: "",
    subtitle: "",
    smalltitle: "",
    bgimg: "/churchonline.jpg",
    link: "/about",
    view: "true",
  },
  {
    title: "",
    subtitle: "",
    smalltitle: "",
    bgimg: "/embracinglegacytile.png",
    link: "/about",
    view: "true",
  },
  {
    title: "",
    subtitle: "",
    smalltitle: "",
    bgimg: "/founderdday2022-tile.jpg",
    link: "/about",
    view: "true",
  },
  {
    title: "The Blueprint:",
    subtitle: "",
    smalltitle: "Empowering Leaders Forward",
    bgimg: "/blueprint.jpg",
    link: "https://www.facebook.com/groups/theblueprintleadership",
    view: "true",
  },
  {
    title: "Truth Connections:",
    subtitle: "",
    smalltitle: "We’re Better Together",
    bgimg: "/TruthConnections.jpg",
    link: "https://revealingtruthdepartments.churchcenter.com/groups",
    view: "true",
  },
]);

provide("hometiles", hometiles.value);
provide("sermons", series.value);
provide("locations", locations.value);
</script>

<style lang="scss">
.container {
  max-width: 1150px;
  padding-left: 1rem; /* 16px */
  padding-right: 1rem;
}

.dropshadow {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.mainlayout {
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: 100%;
}
</style>
