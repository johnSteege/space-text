import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { nullShip, type ShipInstance } from "@/game/ships";
import { useGameStateStore } from "./gameState";

type BattleChoice = {
  text: string;
  disabled: boolean;
  action: () => void;
};

export const useBattleStore = defineStore("battle", () => {
  const enemy = ref<ShipInstance>(nullShip);
  const phaseName = ref<string>("battleIntro");
  const phaseText = ref<string[]>([]);
  const choices = ref<BattleChoice[]>([]);

  const getPhaseAttacker = computed(() => {
    const gameState = useGameStateStore();
    if (gameState.battle.phase in ["enemyTurn", "enemyResult"]) {
      return gameState.battle.enemy;
    } else return gameState.playerShip;
  });

  const getPhaseDefender = computed(() => {
    const gameState = useGameStateStore();
    if (gameState.battle.phase in ["enemyTurn", "enemyResult"]) {
      return gameState.playerShip;
    } else return gameState.battle.enemy;
  });

  function $reset() {
    enemy.value = nullShip;
    phaseName.value = "battleIntro";
    phaseText.value = [];
    choices.value = [];
  }

  return {
    enemy,
    phaseName,
    phaseText,
    choices,
    getPhaseAttacker,
    getPhaseDefender,
    $reset,
  };
});
