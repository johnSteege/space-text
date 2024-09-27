import { createRouter, createMemoryHistory } from "vue-router";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/",
      name: "mainMenu",
      component: () => import("../views/MainMenuView.vue"),
    },
    {
      path: "/game",
      name: "game",
      component: () => import("../views/GameView.vue"),
    },
    {
      path: "/newSave",
      name: "newSave",
      component: () => import("../views/NewSaveView.vue"),
    },
  ],
});

export default router;
