import { createRouter, createWebHistory } from 'vue-router';
import Home from "@/views/AppHome.vue";
import Game from "@/views/AppGame.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/:rows/:cols/:bombs',
      name: 'game',
      component: Game,
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      redirect: {
        name: 'home',
      }
    }
  ],
})

export default router
