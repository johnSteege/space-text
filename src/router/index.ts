import { createRouter, createMemoryHistory } from "vue-router";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/",
      name: "mainMenu",
      component: () => import("@/views/MainMenuView.vue"),
    },
    {
      path: "/game",
      name: "game",
      component: () => import("../views/GameView.vue"),
      children: [
        { path: "ship", component: () => import("@/views/ShipView.vue") },
        {
          path: "inventory",
          component: () => import("@/views/InventoryView.vue"),
        },
        { path: "story", component: () => import("@/views/StoryView.vue") },
      ],
    },
    {
      path: "/newSave",
      name: "newSave",
      component: () => import("@/views/NewSaveView.vue"),
    },
  ],
});

export default router;
