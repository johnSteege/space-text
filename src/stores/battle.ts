import { ref, computed } from "vue";
import { defineStore } from "pinia";
import {
  buildShip,
  nullShip,
  type ShipInstance,
  type ShipTemplate,
} from "@/game/ships";
import { useGameStateStore } from "./gameState";

export const useBattleStore = defineStore("battle", () => {
  const gameState = useGameStateStore();

  const enemy = ref<ShipInstance>(nullShip);
  const phaseName = ref<string>("battleIntro");
  const battleText = ref<string[]>([]);

  const phaseAttacker = computed<ShipInstance>(() => {
    if (phaseName.value in ["enemyTurn", "enemyResult"]) {
      return enemy.value;
    } else return gameState.playerShip;
  });

  const phaseDefender = computed(() => {
    if (phaseName.value in ["enemyTurn", "enemyResult"]) {
      return gameState.playerShip;
    } else return enemy.value;
  });

  const phaseOrder = {
    battleIntro: "playerEnergy",
    playerEnergy: "playerTurn",
    playerTurn: "playerResult",
    playerResult: "enemyTurn",
    enemyTurn: "enemyResult",
    enemyResult: "playerEnergy",
  } as {
    [key: string]: string;
  };

  function nextPhase(): void {
    if (checkIsBattleOver()) {
      return;
    }

    battleText.value = [];

    phaseName.value = phaseOrder[phaseName.value];
  }

  function checkIsBattleOver(): boolean {
    if (gameState.playerShip.hp <= 0) {
      phaseName.value = "battleSummary";

      return true;
    }

    if (enemy.value.hp <= 0) {
      phaseName.value = "battleSummary";

      return true;
    }

    return false;
  }

  function startBattle(enemyTemplate: ShipTemplate): void {
    phaseName.value = "battleIntro";
    enemy.value = buildShip(enemyTemplate);

    // Set energy allocated of every system in both ships to 0.
    gameState.playerShip.systems.forEach((system) => {
      system.energyAllocated = 0;
    });
    enemy.value.systems.forEach((system) => {
      system.energyAllocated = 0;
    });

    gameState.isBattle = true;
  }

  function $reset() {
    enemy.value = nullShip;
    phaseName.value = "battleIntro";
  }

  return {
    enemy,
    phaseName,
    battleText,
    phaseAttacker,
    phaseDefender,
    nextPhase,
    startBattle,
    $reset,
  };
});
