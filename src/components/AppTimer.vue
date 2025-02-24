<script setup>
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  finished: {
    type: Boolean,
    required: true
  }
});

const theTime = ref(0);
const timer = ref(false);
const timerReq = ref(null);

function initTimer() {
  if (props.finished) {
    window.cancelAnimationFrame(timerReq.value);
    return;
  }
  timer.value = false;
  timerReq.value = window.requestAnimationFrame(setTimer);
}

function setTimer(timestamp) {
  if (!timer.value) {
    timer.value = timestamp;
  }
  theTime.value = (timestamp - timer.value) / 1000;
  if (!props.finished) {
    window.requestAnimationFrame(setTimer);
  }
}

watch(
  () => props.finished,
  () => {
    initTimer();
  }
);

onMounted(() => {
  initTimer();
});
</script>

<template>
  <div>{{ theTime.toFixed(1) }}</div>
</template>
