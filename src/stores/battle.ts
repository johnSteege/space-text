import { ref, computed } from "vue";
import { defineStore } from "pinia";
import {
  buildShip,
  nullShip,
  type ShipInstance,
  type ShipTemplate,
} from "@/game/ships";
import { useGameStateStore } from "./gameState";

type BattleChoice = {
  text: string;
  disabled?: boolean;
  action: () => void;
};

export const useBattleStore = defineStore("battle", () => {
  const gameState = useGameStateStore();

  const enemy = ref<ShipInstance>(nullShip);
  const phaseName = ref<string>("battleIntro");
  const phaseText = ref<string[]>([]);
  const choices = ref<BattleChoice[]>([]);

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

  function nextPhase(): void {
    if (checkIsBattleOver()) {
      return;
    }

    if (phaseName.value === "battleIntro") {
      playerEnergy();
    } else if (phaseName.value === "playerEnergy") {
      playerTurn();
    } else if (phaseName.value === "playerTurn") {
      playerResult();
    } else if (phaseName.value === "playerResult") {
      enemyTurn();
    } else if (phaseName.value === "enemyTurn") {
      enemyResult();
    } else if (phaseName.value === "enemyResult") {
      playerEnergy();
    } else {
      phaseName.value = "battleSummary";
      phaseText.value = ["ErRoR - Invalid battle phase"];
    }
  }

  function checkIsBattleOver(): boolean {
    if (gameState.playerShip.hp <= 0) {
      phaseName.value = "battleSummary";
      phaseText.value.push("You have been defeated!");
      choices.value = [
        {
          text: "Game Over",
          action: () => {
            gameState.isBattle = false;
            $reset();
            gameState.sceneId = "gameOver";
          },
        },
      ];

      return true;
    }

    if (enemy.value.hp <= 0) {
      phaseName.value = "battleSummary";
      phaseText.value.push("The enemy has been defeated!");
      choices.value = [
        {
          text: "Continue",
          action: () => {
            gameState.isBattle = false;
            $reset();
            gameState.sceneId = "dialogue1";
          },
        },
      ];

      return true;
    }

    return false;
  }

  function startBattle(enemyTemplate: ShipTemplate): void {
    enemy.value = buildShip(enemyTemplate);
    phaseName.value = "battleIntro";
    phaseText.value = [`A ${enemy.value.template.templateName} has appeared!`];
    choices.value = [
      {
        text: "Start Battle",
        action: () => {
          nextPhase();
        },
      },
    ];

    // Set energy allocated of every system in both ships to 0.
    gameState.playerShip.systems.forEach((system) => {
      system.energyAllocated = 0;
    });
    enemy.value.systems.forEach((system) => {
      system.energyAllocated = 0;
    });

    gameState.isBattle = true;
  }

  function playerEnergy(): void {
    initPhaseEnergy();

    // This phase is mostly handled in EnergyAllocation.vue
    phaseName.value = "playerEnergy";
    phaseText.value = ["Allocate Reactor Energy"];
    choices.value = [
      {
        text: "Continue",
        action: () => {
          applyPhaseEnergy();
          nextPhase();
        },
      },
    ];
  }

  function initPhaseEnergy(): void {
    gameState.playerShip.unallocatedEnergy = gameState.playerShip.energyPerTurn;
    gameState.playerShip.systems.forEach((system) => {
      system.phaseEnergy = 0;
    });
  }

  function applyPhaseEnergy(): void {
    gameState.playerShip.systems.forEach((system) => {
      system.energyAllocated += system.phaseEnergy;
      system.phaseEnergy = 0;
    });
  }

  function playerTurn(): void {
    phaseName.value = "playerTurn";
    phaseText.value = ["Complete your turn"];
    choices.value = [];
    gameState.playerShip.systems.forEach((system) => {
      if (system.energyAllocated >= system.template.energyNeeded) {
        choices.value.push({
          text: system.template.name,
          action: () => {
            system.energyAllocated = 0;
            system.template.action();
          },
        });
      }
    });

    choices.value.push({
      text: "Continue",
      action: () => nextPhase(),
    });
  }

  function playerResult(): void {
    phaseName.value = "playerResult";
    // phaseText.value = "You did some damage";
    choices.value = [
      {
        text: "Continue",
        action: () => {
          nextPhase();
        },
      },
    ];
  }

  function enemyTurn(): void {
    phaseName.value = "enemyTurn";
    phaseText.value = ["Enemy is attacking"];
    choices.value = [
      {
        text: "Shields Up",
        action: () => {
          enemy.value.systems[0].template.action();
          nextPhase();
        },
      },
    ];
  }

  function enemyResult(): void {
    phaseName.value = "enemyResult";
    // phaseText.value = "You blocked some damage";
    choices.value = [
      {
        text: "Continue",
        action: () => {
          nextPhase();
        },
      },
    ];
  }

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
    phaseAttacker,
    phaseDefender,
    startBattle,
    $reset,
  };
});
