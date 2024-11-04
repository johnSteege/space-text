import { ref } from "vue";
import { defineStore } from "pinia";
import { makeShip, type Ship } from "@/game/ships";

export const useGameStateStore = defineStore("gameState", () => {
  const sceneId = ref("none");
  const playerShip = ref<Ship>(makeShip("error"));
  const playerMoney = ref(0);
  const isBattle = ref(false);

  function $reset(): void {
    sceneId.value = "none";
    playerShip.value = makeShip("error");
    playerMoney.value = 0;
    isBattle.value = false;
  }

  return {
    sceneId,
    $reset,
    playerShip,
    playerMoney,
    isBattle,
  };
});
