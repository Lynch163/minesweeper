<script setup>
import { computed } from 'vue';

const prop = defineProps({
  cell: {
    type: Object,
    required: true
  }
});

const getClass = computed(() => {
  const cell = prop.cell;
  if (cell.isOpen && cell.hasBomb) {
    return 'minesweeper-bomb';
  }
  if (cell.isOpen) {
    return 'minesweeper-open';
  }
  if (cell.hasFlag) {
    return 'minesweeper-flag';
  }
  return '';
});
</script>

<template>
  <div class="minesweeper-cell" :class="getClass">
    <div v-if="cell.isOpen && cell.bombCount">
      {{ cell.bombCount }}
    </div>
    <div v-if="cell.hasFlag">&#9873;</div>
  </div>
</template>

<style lang="scss" scoped>
.minesweeper {
  &-cell {
    align-items: center;
    background: rgba(0, 0, 0, 0.1);
    border: 1px white solid;
    color: #2c3e50;
    cursor: pointer;
    display: flex;
    font-size: 1.3em;
    justify-content: center;
    min-height: 35px;
    min-width: 35px;
  }

  &-bomb {
    background: #c0392b;
  }

  &-open {
    background: rgba(0, 0, 0, 0.05);
  }

  &-flag {
    background: #2ecc71;
  }
}
</style>
