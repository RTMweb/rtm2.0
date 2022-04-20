<script setup>
const version = 2 + 1;
const click = () => {
  console.log("click");
};
</script>

<template>
  <div class="hello" @click="click">Hello Nuxt {{ version }}!</div>
</template>

<style scoped>
.hello {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3rem;
  padding: 10rem;
}
</style>
