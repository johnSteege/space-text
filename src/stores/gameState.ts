import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useGameStateStore = defineStore("gameState", () => {
  const sceneId = ref("none");

  function reset(): void {
    sceneId.value = "none";
  }

  return { sceneId, reset };
});
