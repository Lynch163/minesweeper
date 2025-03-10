<script setup>
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  finished: {
    type: Boolean,
    required: true
  }
});

const elapsedTime = ref(0);
const startTime = ref(null);
const animationFrameId = ref(null);

function startTimer(timestamp) {
  if (!startTime.value) {
    startTime.value = timestamp;
  }
  elapsedTime.value = (timestamp - startTime.value) / 1000;

  if (!props.finished) {
    animationFrameId.value = requestAnimationFrame(startTimer);
  }
}

function stopTimer() {
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
  }
}

function handleTimer() {
  if (props.finished) {
    stopTimer();
    return;
  }

  startTime.value = null;
  animationFrameId.value = requestAnimationFrame(startTimer);
}

watch(() => props.finished, handleTimer);

onMounted(handleTimer);
</script>

<template>
  <div>{{ elapsedTime.toFixed(1) }}</div>
</template>
