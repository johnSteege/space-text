import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { nullShip, type ShipInstance } from "@/game/ships";

export const useGameStateStore = defineStore("gameState", () => {
  const sceneId = ref("none");
  const playerShip = ref<ShipInstance>(nullShip);
  const playerMoney = ref(0);
  const isBattle = ref(false);

  function $reset(): void {
    sceneId.value = "none";
    playerShip.value = nullShip;
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
