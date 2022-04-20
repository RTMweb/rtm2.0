<template>
  <div>
    <Video
      vid="https://firebasestorage.googleapis.com/v0/b/revealing-truth-website.appspot.com/o/video%2FJan30.mp4?alt=media&token=4222ac50-4bef-4f91-8bfb-d0954fcd3c86"
    />

    <div class="max-w-screen-lg mx-auto mt-4 px-4">
      <MainCard bg-img="/HeroPastors.jpeg" />
    </div>

    <ThreeCol class="mt-4 px-4">
      <template #left>
        <div v-for="tile in tiles">
          <MainTile
            :bg-img="tile.bgimg"
            :title="tile.title"
            :subtitle="tile.subtitle"
            :subtext="tile.smalltitle"
            :link="tile.link"
          />
        </div>
      </template>
      <template #right>
        <SideMenu />
      </template>
    </ThreeCol>
  </div>
</template>

<script setup>
import ThreeCol from "../components/layoutUtils/threeCol.vue";
import MainTile from "../components/MainTile.vue";
import SideMenu from "../components/sidemenu/SideMenu.vue";

const tiles = inject("hometiles");
</script>
