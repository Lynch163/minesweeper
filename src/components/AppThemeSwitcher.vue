<script setup>
import { computed } from 'vue';
import { useTheme } from '@/composables/useTheme';

const { theme, setTheme } = useTheme();

const nextTheme = computed(() => (theme.value === 'light' ? 'dark' : 'light'));
const themeIcon = computed(() => (theme.value === 'light' ? '&#9728;' : '&#127762;'));

const toggleTheme = () => {
  setTheme(nextTheme.value);
};
</script>

<template>
  <button @click="toggleTheme" v-html="themeIcon" />
</template>

<style lang="scss" scoped>
button {
  border: none;
  background: inherit;
  cursor: pointer;
  font-size: 1.5em;
  padding: 0.5em;
}
</style>
