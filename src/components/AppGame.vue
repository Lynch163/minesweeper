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
  let bombs = props.bombs;
  const size = props.rows * props.cols;
  const newGrid = [];
  if (bombs > size) {
    console.log('more bombs than space on the grid!');
    return;
  }
  for (let i = 0; i < size; i += 1) {
    newGrid.push({
      hasBomb: false,
      isOpen: false,
      hasFlag: false,
      bombCount: 0,
      neighborhood: null
    });
  }
  while (bombs > 0) {
    const num = Math.floor(Math.random() * size);
    if (newGrid[num].hasBomb === false) {
      bombs -= 1;
      newGrid[num].hasBomb = true;
    }
  }
  grid.value = newGrid;
  finished.value = true;
  nextTick(() => {
    finished.value = false;
  });
  won.value = false;
  bombCount.value = props.bombs;
}

function haveWeWon() {
  if (finished.value) return;
  if (bombCount.value !== 0) return;

  const remainingGrid = grid.value.find((g) => !g.isOpen && !g.hasFlag);
  if (!remainingGrid) {
    finished.value = true;
    won.value = true;
  }
}

function addFlag(cell) {
  if (finished.value || cell.isOpen) return;

  cell.hasFlag = !cell.hasFlag;
  const flagCount = grid.value.reduce((acc, curr) => (curr.hasFlag ? acc + 1 : acc), 0);
  bombCount.value = props.bombs - flagCount;
  haveWeWon();
}

function doubleClick(cell, i) {
  if (finished.value || !cell.isOpen) return;

  setNeighborhood(cell, i);
  if (!cell.bombCount) return;

  let flagCount = 0;
  cell.neighborhood.forEach((j) => {
    if (grid.value[j].hasFlag) flagCount += 1;
  });

  if (flagCount === cell.bombCount) checkNeighborhood(cell, true);
}

function clickCell(cell, i) {
  if (finished.value || cell.hasFlag || cell.isOpen) return;

  if (cell.hasBomb) {
    grid.value.forEach((checkCell) => {
      if (checkCell.hasBomb) checkCell.isOpen = true;
    });
    finished.value = true;
    return;
  }

  setNeighborhood(cell, i);
  cell.isOpen = true;
  checkNeighborhood(cell);
  haveWeWon();
}

function checkNeighborhood(cell, force) {
  if (cell.bombCount !== 0 && !force) return;

  cell.neighborhood.forEach((i) => clickCell(grid.value[i], i));
}

function setNeighborhood(cell, i) {
  if (cell.neighborhood !== null) return;

  const neighborhood = [];
  let bombCount = 0;

  for (let x = -1; x < 2; x += 1) {
    for (let y = -1; y < 2; y += 1) {
      const cellIndex = getIndex(i, x, y);
      if (cellIndex !== false) {
        neighborhood.push(cellIndex);
        if (grid.value[cellIndex].hasBomb) bombCount += 1;
      }
    }
  }
  cell.bombCount = bombCount;
  cell.neighborhood = neighborhood;
}

function getIndex(i, x, y) {
  const { cols, rows } = props;

  if (x === 0 && y === 0) return false;
  if ((i % cols) + x < 0 || (i % cols) + x >= cols) return false;
  if (Math.floor(i / cols) + y < 0 || Math.floor(i / cols) + y >= rows) return false;

  return i + (y * cols + x);
}

watch(
  () => [props.rows, props.cols, props.bombs],
  () => {
    initGrid();
  },
  { deep: true }
);

onMounted(() => {
  initGrid();
});
</script>

<template>
  <div class="minesweeper">
    <div class="minesweeper-status">
      <div class="minesweeper-bombcount">
        {{ bombCount }}
      </div>
      <a href="#" @click.prevent="initGrid"> &#9786; </a>
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
