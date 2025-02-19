<template>
  <div>
    <div class="container py-3">
      <h1>The minesweeper</h1>
    </div>
    <div class="bg-light">
      <div class="container py-3">
        <h3>Выберите сложность</h3>
        <div class="row">
          <div class="col-12 col-md-4 py-3">
            <RouterLink href="#" class="btn btn-lg btn-block btn-success" :to="{
              name: 'game',
              params: {
                rows: 9,
                cols: 9,
                bombs: 10,
              }}">
              😉
              Легкий
            </RouterLink>
            <p class="pt-3">Простая игра с полем 9х9</p>
          </div>
          <div class="col-12 col-md-4 py-3">
            <RouterLink href="#" class="btn btn-lg btn-block btn-warning" :to="{
              name: 'game',
              params: {
                rows: 16,
                cols: 16,
                bombs: 40,
              }}">
              🤨
              Средний
            </RouterLink>
            <p class="pt-3">Средний уровень с полем 16х16</p>
          </div>
          <div class="col-12 col-md-4 py-3">
            <RouterLink href="#" class="btn btn-lg btn-block btn-danger" :to="{
              name: 'game',
              params: {
                rows: 16,
                cols: 30,
                bombs: 99,
              }}">
              🤯
              Эксперт
            </RouterLink>
            <p class="pt-3">Брось вызов 99 минам на поле 16x99</p>
          </div>
        </div>
      </div>
    </div>

    <form class="bg-primary py-3 text-light" @submit="updateRoute">
      <div class="container">
        <h3>Либо выберите свои параметры</h3>
        <div class="row">
          <div class="form-group col-12 col-md-4">
            <label for="input-rows"> Кол-во строк</label>
            <input type="number" v-model.number="rows" class="form-control"
                   min="1" max="50" id="input-rows">
          </div>
          <div class="form-group col-12 col-md-4">
            <label for="input-cols">Кол-во колонок</label>
            <input type="number" v-model.number="cols" class="form-control"
                   min="1" max="50" id="input-cols">
          </div>
          <div class="form-group col-12 col-md-4">
            <label for="input-bombs">Кол-во мин</label>
            <input type="number" v-model.number="bombs" class="form-control"
                   min="1" max="99" id="input-bombs">
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button type="submit" class="btn btn-secondary">
              &#127922;
              Play
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
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
};
</script>
