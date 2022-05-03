<template>
  <div>
    <IFrame :message="message" />

    <div>
      {{ messageData.title }}<br />
      {{ messageData.pastor }}<br />
      {{ messageData.date }}<br />
      {{ messageData.description }}<br />
    </div>
  </div>
</template>

<script setup>
import IFrame from "./IFrame.vue";

const props = defineProps({
  message: {
    type: String,
  },
  messageData: {
    type: Object,
  },
});
</script>

<style>
.lds-facebook {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: red;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%,
  100% {
    top: 24px;
    height: 32px;
  }
}
</style>
