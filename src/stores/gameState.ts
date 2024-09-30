import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { type Battle } from "@/game/battle";

export const useGameStateStore = defineStore("gameState", () => {
  const sceneId = ref("none");
  const playerMaxHealth = ref(15);
  const playerHealth = ref(15);
  const playerBlock = ref(1);
  const playerAttack = ref(1);
  const playerDodge = ref(1);
  const playerMoney = ref(0);
  const battle = ref<Battle | null>(null);

  function reset(): void {
    sceneId.value = "none";
    playerMaxHealth.value = 15;
    playerHealth.value = 15;
    playerBlock.value = 1;
    playerAttack.value = 1;
    playerDodge.value = 1;
    playerMoney.value = 0;
    battle.value = null;
  }

  return {
    sceneId,
    reset,
    playerMaxHealth,
    playerHealth,
    playerBlock,
    playerAttack,
    playerDodge,
    playerMoney,
    battle,
  };
});
