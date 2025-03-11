<script setup>
import { computed } from 'vue';

const props = defineProps({
  cell: {
    type: Object,
    required: true
  }
});

const getCellClass = (cell) => {
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
};

const cellClass = computed(() => getCellClass(props.cell));
</script>

<template>
  <div class="minesweeper-cell" :class="cellClass">
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
    border: 1px var(--background-color) solid;
    color: var(--text-color);
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
    background: var(--cell-open-background);
  }

  &-flag {
    background: #2ecc71;
  }
}
</style>
