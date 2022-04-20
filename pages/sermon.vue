<template>
  <div>
    <SeriesSlider :series="series" />
    <mediaScroller>
      <div v-for="msg in series" :key="msg.id" class="media-element">
        <nuxt-link :to="`/${msg.id}`">
          <div>
            <div
              class="main grid w-full aspect-video relative rounded-md content-end p-4 mb-4"
              :style="{
                backgroundImage: `url(${msg.image})`,
              }"
            ></div>
          </div>
        </nuxt-link>
      </div>
    </mediaScroller>
  </div>
</template>

<script setup>
import SeriesSlider from "../components/SermonSlider.vue";
import mediaScroller from "../components/ui/mediaScroller.vue";

const series = inject("sermons");
</script>

<style lang="scss" scoped>
.main {
  aspect-ratio: 14/ 9;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.media-element {
  padding: 1rem;

  & > img {
    inline-size: 100%;
    aspect-ration: 16 /9;
    object-fit: cover;
  }
}
</style>
