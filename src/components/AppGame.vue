<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import AppCell from '@/components/AppCell.vue';
import AppTimer from '@/components/AppTimer.vue';

const props = defineProps({
  cols: {
    type: Number,
    default: 9
  },
  rows: {
    type: Number,
    default: 9
  },
  bombs: {
    type: Number,
    default: 10
  }
});

const bombCount = ref(0);
const finished = ref(false);
const won = ref(false);
const grid = ref([]);

const getGridStyle = computed(() => {
  return `grid-template-columns: repeat(${props.cols}, 1fr);`;
});

function initGrid() {
  const { rows, cols, bombs } = props;
  const size = rows * cols;

  if (bombs > size) {
    console.error('More bombs than space on the grid!');
    return;
  }

  const newGrid = Array.from({ length: size }, () => ({
    hasBomb: false,
    isOpen: false,
    hasFlag: false,
    bombCount: 0,
    neighborhood: null
  }));

  let bombsToPlace = bombs;
  while (bombsToPlace > 0) {
    const randomIndex = Math.floor(Math.random() * size);
    if (!newGrid[randomIndex].hasBomb) {
      newGrid[randomIndex].hasBomb = true;
      bombsToPlace--;
    }
  }

  grid.value = newGrid;
  finished.value = true;
  nextTick(() => {
    finished.value = false;
  });
  won.value = false;
  bombCount.value = bombs;
}

function haveWeWon() {
  if (finished.value || bombCount.value !== 0) return;

  const isAllCellsOpen = grid.value.every((cell) => cell.isOpen || cell.hasFlag);
  if (isAllCellsOpen) {
    finished.value = true;
    won.value = true;
  }
}

function addFlag(cell) {
  if (finished.value || cell.isOpen) return;

  cell.hasFlag = !cell.hasFlag;
  bombCount.value = props.bombs - grid.value.filter((c) => c.hasFlag).length;
  haveWeWon();
}

function doubleClick(cell, index) {
  if (finished.value || !cell.isOpen) return;

  setNeighborhood(cell, index);
  if (cell.bombCount === 0) return;

  const flagCount = cell.neighborhood.filter((i) => grid.value[i].hasFlag).length;
  if (flagCount === cell.bombCount) {
    cell.neighborhood.forEach((i) => clickCell(grid.value[i], i));
  }
}

function clickCell(cell, index) {
  if (finished.value || cell.hasFlag || cell.isOpen) return;

  if (cell.hasBomb) {
    grid.value.forEach((c) => {
      if (c.hasBomb) c.isOpen = true;
    });
    finished.value = true;
    return;
  }

  setNeighborhood(cell, index);
  cell.isOpen = true;
  if (cell.bombCount === 0) {
    cell.neighborhood.forEach((i) => clickCell(grid.value[i], i));
  }
  haveWeWon();
}

function setNeighborhood(cell, index) {
  if (cell.neighborhood !== null) return;

  const { cols, rows } = props;
  const neighborhood = [];
  let count = 0;

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (x === 0 && y === 0) continue;

      const neighborIndex = getIndex(index, x, y, cols, rows);
      if (neighborIndex !== false) {
        neighborhood.push(neighborIndex);
        if (grid.value[neighborIndex].hasBomb) count++;
      }
    }
  }

  cell.bombCount = count;
  cell.neighborhood = neighborhood;
}

function getIndex(index, x, y, cols, rows) {
  const col = index % cols;
  const row = Math.floor(index / cols);

  if (col + x < 0 || col + x >= cols || row + y < 0 || row + y >= rows) return false;
  return index + y * cols + x;
}

watch(() => [props.rows, props.cols, props.bombs], initGrid, { deep: true });

onMounted(initGrid);
</script>

<template>
  <div class="minesweeper">
    <div class="minesweeper-status">
      <div class="minesweeper-bombcount">{{ bombCount }}</div>
      <a href="#" @click.prevent="initGrid">&#9786;</a>
      <AppTimer class="minesweeper-timer" :finished="finished" />
    </div>

    <div class="minesweeper-grid" :style="getGridStyle">
      <AppCell
        v-for="(cell, i) in grid"
        :key="i"
        :cell="cell"
        @click="clickCell(cell, i)"
        @click.right="addFlag(cell)"
        @dblclick.prevent="doubleClick(cell, i)"
        @contextmenu.prevent
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.minesweeper {
  &-status {
    display: flex;
    justify-content: space-between;
    padding: 1rem;

    > * {
      flex: 1;
      text-align: center;
    }
  }

  &-grid {
    user-select: none;
    position: relative;
    overflow: auto;
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-auto-rows: 1fr;

    &:before {
      content: '';
      width: 0;
      padding-bottom: 100%;
      grid-row: 1 / 1;
      grid-column: 1 / 1;
    }

    > *:first-child {
      grid-row: 1 / 1;
      grid-column: 1 / 1;
    }
  }
}
</style>
