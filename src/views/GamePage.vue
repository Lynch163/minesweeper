<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import AppGame from '@/components/AppGame.vue';
import AppThemeSwitcher from '@/components/AppThemeSwitcher.vue';

const route = useRoute();

const gameParams = ref({
  rows: 0,
  cols: 0,
  bombs: 0
});

const doesItFit = computed(() => {
  return maxBombs.value >= gameParams.value.bombs;
});

const maxBombs = computed(() => {
  const { rows, cols } = gameParams.value;
  return rows * cols;
});

function initParams(params) {
  gameParams.value.rows = Number(params.rows);
  gameParams.value.cols = Number(params.cols);
  gameParams.value.bombs = Number(params.bombs);
}

onMounted(() => {
  initParams(route.params);
});
</script>

<template>
  <div>
    <div class="bg-light">
      <div class="container py-3">
        <RouterLink :to="{ name: 'home' }" class="btn btn-outline-secondary" aria-label="Back">
          ←
        </RouterLink>
        <h3 class="d-inline btn">The minesweeper</h3>
        <AppThemeSwitcher v-show="false" />
      </div>
    </div>
    <div class="container pb-3">
      <div class="row justify-content-md-center">
        <div class="col" :class="{ 'col-md-9 col-lg-7': gameParams.cols < 14 }">
          <AppGame
            v-if="doesItFit"
            :rows="gameParams.rows"
            :cols="gameParams.cols"
            :bombs="gameParams.bombs"
          />
          <template v-else>
            <h3 class="text-center">416: Выход за пределы</h3>
            <p>При заданном поле, количество мин должно быть не более {{ maxBombs }}</p>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
