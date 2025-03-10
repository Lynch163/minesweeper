<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import AppThemeSwitcher from '@/components/AppThemeSwitcher.vue';

const router = useRouter();

const rowsCount = ref(9);
const colsCount = ref(9);
const bombsCount = ref(10);

const difficultyLevels = [
  {
    label: '😉 Легкий',
    class: 'btn-success',
    params: { rows: 9, cols: 9, bombs: 10 },
    description: 'Простая игра с полем 9х9'
  },
  {
    label: '🤨 Средний',
    class: 'btn-warning',
    params: { rows: 16, cols: 16, bombs: 40 },
    description: 'Средний уровень с полем 16х16'
  },
  {
    label: '🤯 Эксперт',
    class: 'btn-danger',
    params: { rows: 16, cols: 30, bombs: 99 },
    description: 'Брось вызов 99 минам на поле 16x30'
  }
];

function updateRoute(event) {
  event.preventDefault();
  router.push({
    name: 'game',
    params: {
      rows: rowsCount.value,
      cols: colsCount.value,
      bombs: bombsCount.value
    }
  });
}
</script>

<template>
  <div>
    <div class="d-flex align-items-center justify-content-between container py-3">
      <h1>The minesweeper</h1>
      <AppThemeSwitcher />
    </div>
    <div class="container py-3">
      <h3>Выберите сложность</h3>
      <div class="row">
        <div v-for="(level, index) in difficultyLevels" :key="index" class="col-12 col-md-4 py-3">
          <RouterLink
            :to="{ name: 'game', params: level.params }"
            class="btn btn-lg btn-block"
            :class="level.class"
          >
            {{ level.label }}
          </RouterLink>
          <p class="pt-3">{{ level.description }}</p>
        </div>
      </div>
    </div>

    <form class="bg-primary py-3 text-light" @submit="updateRoute">
      <div class="container">
        <h3>Либо укажите свои параметры</h3>
        <div class="row">
          <div class="form-group col-12 col-md-4">
            <label for="input-rows">Кол-во строк</label>
            <input
              type="number"
              v-model="rowsCount"
              class="form-control"
              min="1"
              max="50"
              id="input-rows"
            />
          </div>
          <div class="form-group col-12 col-md-4">
            <label for="input-cols">Кол-во колонок</label>
            <input
              type="number"
              v-model="colsCount"
              class="form-control"
              min="1"
              max="50"
              id="input-cols"
            />
          </div>
          <div class="form-group col-12 col-md-4">
            <label for="input-bombs">Кол-во мин</label>
            <input
              type="number"
              v-model="bombsCount"
              class="form-control"
              min="1"
              max="99"
              id="input-bombs"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button type="submit" class="btn btn-secondary">&#127922; Play</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
