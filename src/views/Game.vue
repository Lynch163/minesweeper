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
             v-if="doesItFit()"
             :class="{'col-md-9 col-lg-7': cols < 14}"
        >
          <MinesweeperGame :rows="rows" :cols="cols" :bombs="bombs" />
        </div>
        <div v-else>
          <h3 class="text-center">416: Выход за пределы</h3>
          <p>Количество мин не может быть больше общего количества ячеек!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MinesweeperGame from "@/components/AppGame.vue";

export default {
  name: 'game',
  components: {MinesweeperGame},
  data() {
    return {
      rows: 9,
      cols: 9,
      bombs: 10,
    };
  },
  mounted() {
    this.initParams(this.$route.params);
  },
  methods: {
    doesItFit() {
      const { rows, cols, bombs } = this;
      if ((rows * cols) < bombs) {
        return false;
      }
      if (rows > 50) {
        return false;
      }
      if (cols > 50) {
        return false;
      }
      if (bombs > 99) {
        return false;
      }
      return true;
    },
    initParams(params) {
      const { rows, cols, bombs } = params;
      this.rows = parseInt(rows) || 9;
      this.cols = parseInt(cols) || 9;
      this.bombs = parseInt(bombs) || 10;
    },
    updateRoute(extraParams) {
      const { rows, cols, bombs } = this;
      const params = Object.assign({
        rows,
        cols,
        bombs,
      }, extraParams);

      this.$router.push({
        name: 'game',
        params,
      });
    },
  },
  watch: {
    rows(to) {
      this.updateRoute({
        rows: to,
      });
    },
    cols(to) {
      this.updateRoute({
        cols: to,
      });
    },
    bombs(to) {
      this.updateRoute({
        bombs: to,
      });
    },
    $route(to) {
      this.initParams(to.params);
    },
  },
};
</script>
