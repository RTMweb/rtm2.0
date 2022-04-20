<template>
  <section>
    <div
      class="grid place-items-center relative overflow-hidden bg-dark-800"
      @click="playing = !playing"
      @mouseleave="playing = false"
      @mouseover="playing = !playing"
    >
      <div class="absolute container mx-auto text-light-50 grid self-end z-20 mb-20">
        <div
          class="flex items-center flex-grow-0"
          :class="{ fade: hover }"
          @mouseover="hover = true"
        >
          <p class="series">{{ data.series }}</p>
          <div>|</div>
          <p class="title">{{ data.message }}</p>
        </div>
        <button class="btn btn-yellow w-44">Watch Message</button>
      </div>
      <div
        :src="data.imageLink"
        class="absolute object-cover z-10 min-h-full min-w-full w-auto h-auto bg-top bg-cover"
        :style="{ backgroundImage: 'url(' + data.imageLink + ')' }"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        :class="{ fade: hover }"
      ></div>
      <video
        ref="el"
        class="aspect-video max-h-2xl w-full"
        style="object-fit: contain"
        preload="auto"
      >
        Your browser does not support HTML5 video.
      </video>
    </div>
  </section>
</template>

<script setup>
const { data } = await useAsyncData("feature", () =>
  $fetch("/api/notion/4b3f8755b9f646d6ad74f12cc745dc68")
);

const props = defineProps({
  poster: { type: String },
  // vid: { type: String },
});

const el = ref(null);
const isHovered = useElementHover(el);

const { playing, currentTime, duration, volume } = useMediaControls(el, {
  src: data.value.video,
});

const hover = ref(false);

if (el.value) {
  const playVideo = () => {
    hover.value = true;
    el.value.play();
  };
}
</script>

<style lang="scss">
.fade {
  opacity: 0;
  transition: all;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
}

.series {
  font-size: clamp(1rem, 20vw, 3rem);
  font-weight: bold;
}
.title {
  font-size: clamp(1rem, 20vw, 3rem);
}
</style>
