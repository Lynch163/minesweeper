<script setup>
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import AppGame from "@/components/AppGame.vue";

const route = useRoute();

const rows = ref(0);
const cols = ref(0);
const bombs = ref(0);

const doesItFit = computed(()=> {
  return (rows.value * cols.value) >= bombs.value;
});

function initParams(params) {
  rows.value = Number(params.rows);
  cols.value = Number(params.cols);
  bombs.value = Number(params.bombs);
}

onMounted(() => {
  initParams(route.params);
});
</script>

<template>
  <div>
    <div class="bg-light">
      <div class="container py-3">
        <RouterLink :to="{name: 'home'}" class="btn btn-outline-secondary" aria-label="Back">
          ←
        </RouterLink>
        <h3 class="d-inline btn">The minesweeper</h3>
      </div>
    </div>
    <div class="container pb-3">
      <div class="row justify-content-md-center">
        <div class="col"
             v-if="doesItFit"
             :class="{'col-md-9 col-lg-7': cols < 14}"
        >
          <AppGame :rows="rows" :cols="cols" :bombs="bombs" />
        </div>
        <div v-else>
          <h3 class="text-center">416: Выход за пределы</h3>
          <p>При заданном поле, количество мин должно быть не более {{ cols * rows }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
