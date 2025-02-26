<template>
  <button @click="toggleTheme">
    {{ theme === 'light' ? '&#9728;' : '&#127762;' }}
  </button>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme';

const { theme, setTheme } = useTheme();

const toggleTheme = () => {
  setTheme(theme.value === 'light' ? 'dark' : 'light');
};
</script>

<style lang="scss" scoped>
button {
  border: none;
  background: inherit;
}
</style>
