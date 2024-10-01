import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { type Battle } from "@/game/battle";
import { defaultPlayerShip, type ShipInstance } from "@/game/ships";

export const useGameStateStore = defineStore("gameState", () => {
  const sceneId = ref("none");
  const playerShip = ref<ShipInstance>(defaultPlayerShip);
  const playerMoney = ref(0);
  const battle = ref<Battle | null>(null);

  function reset(): void {
    sceneId.value = "none";
    playerShip.value = defaultPlayerShip;
    playerMoney.value = 0;
    battle.value = null;
  }

  return {
    sceneId,
    reset,
    playerShip,
    playerMoney,
    battle,
  };
});
