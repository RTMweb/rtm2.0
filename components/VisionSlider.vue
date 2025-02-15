<template>
  <div class="container px-4 relative">
    <Swiper
      :breakpoints="{
        640: { slidesPerView: 1, spaceBetween: 20 },
      }"
      @swiper="visionSwiper"
      @reachEnd="end = false"
      @fromEdge="(end = true), (start = true);"
      @reachBeginning="start = false"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="(slide, index) in slides" :key="index">
        <div
          class="content-center justify-center border-accent max-w-[600px] mx-auto py-auto"
        >
          <h3>{{ slide.title }}</h3>
          <p>
            {{ slide.text }}
          </p>
        </div>
      </swiper-slide>
    </Swiper>
    <div
      class="flex justify-center text-[rgba(121, 121, 121, var(--tw-text-opacity))] max-w-[600px] mx-auto mt-6 lg:mt-10"
    >
      {{ activeSlide + 1 }} of {{ slides.length }}
    </div>
    <div class="lg:(absolute top-[50%] left-0 w-full mt-0) flex mt-4 z-10 px-4">
      <div class="mr-auto flex items-center border-none" v-show="start" @click="prev()">
        <div>
          <svg class="prev">
            <use xlink:href="/images/icons/sprite.svg#triangle"></use>
          </svg>
        </div>
        {{ backText }}
      </div>

      <div class="ml-auto flex items-center border-none" v-show="end" @click="next()">
        {{ nextText }}
        <div>
          <svg class="next">
            <use xlink:href="/images/icons/sprite.svg#triangle"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/grid";

const mySwiper = ref();
const end = ref(true);
const start = ref(false);
const next = ref(true);
const prev = ref(false);
const activeSlide = ref(0);

const slides = ref([
  {
    title: "Local Vision",
    text:
      "Our local churches are destinations where people experience and learn to access an overflow of peace, prosperity, security, stability health, healing and truth through Christ. God has led us to plant churches in several cities. In this season, God is calling us to expand and plant once again in Lakeland, Florida, and Riverview, Florida.",
  },
  {
    title: "Community Outreach",
    text:
      "God has made a promise to us that we will build leaders and impact nations around the world on the value of long term relationships. God has spoken to us that Greg Powe Ministries, which our founding Pastor formed over 20 years ago, is to become Living Legacy in honor of his commitment to building strong leaders who would create and inspire change from generation to generation.",
  },
  {
    title: "Body of Christ Vision",
    text:
      "God has spoken great things to us that require great provision. We believe God will provide and exceed our $1 million goal to achieve these accomplishments. We are believing God to bring increase and overflow into the life of every person seeking to sow and partner with us in this great work that will touch and heal many lives and bring glory to God’s kingdom.",
  },
  {
    title: "Embracing Legacy (Our Youth)",
    text:
      "Innovation and Arts Center The goal of Embracing Legacy (EL) is to positively impact 1,000 Tampa Bay area youth weekly through the arts and academics in order to leave a legacy of character, hope and prosperity for generations to come.",
  },
]);

const visionSwiper = (swiper) => {
  next.value = () => {
    swiper.slideNext();
  };
  prev.value = () => {
    swiper.slidePrev();
  };
  mySwiper.value = swiper;

  activeSlide.value = mySwiper.value.activeIndex;
};

const onSlideChange = () => {
  activeSlide.value = mySwiper.value.activeIndex;
};

const backText = computed(() => {
  if (activeSlide.value - 1 < 0) return;
  const str = slides.value[activeSlide.value - 1].title;
  return str.slice(0, 13) + "...";
});
const nextText = computed(() => {
  if (activeSlide.value + 1 === slides.value.length) return;
  const str = slides.value[activeSlide.value + 1].title;
  return str.slice(0, 13) + "...";
});
</script>

<style lang="scss" scoped>
.next {
  height: 30px;
  width: 30px;
  fill: #0060a6;
  transform: rotate(90deg);
}
.prev {
  height: 30px;
  width: 30px;
  fill: #0060a6;
  transform: rotate(-90deg);
}
.swiper-slide {
  width: 375px;
}

h3 {
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2rem;
  --tw-text-opacity: 1;
  color: rgba(77, 77, 77, var(--tw-text-opacity));
  margin-bottom: 0.5rem;
}

p {
  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
  --tw-text-opacity: 1;
  color: rgba(121, 121, 121, var(--tw-text-opacity));
}
</style>
