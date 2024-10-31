import { ref, computed } from "vue";
import { defineStore } from "pinia";
import {
  buildShip,
  nullShip,
  type ShipInstance,
  type ShipTemplate,
} from "@/game/ships";
import { useGameStateStore } from "./gameState";
import {
  fireWeapon,
  isAtMaxEnergy,
  type ShipSystemInstance,
} from "@/game/shipSystems";

export const useBattleStore = defineStore("battle", () => {
  const gameState = useGameStateStore();

  const enemy = ref<ShipInstance>(nullShip);
  const phaseName = ref<string>("battleIntro");
  const battleText = ref<string[]>([]);

  const phaseAttacker = computed<ShipInstance>(() => {
    return ["enemyTurn", "enemyResult"].includes(phaseName.value)
      ? enemy.value
      : gameState.playerShip;
  });

  const phaseDefender = computed<ShipInstance>(() => {
    return ["enemyTurn", "enemyResult"].includes(phaseName.value)
      ? gameState.playerShip
      : enemy.value;
  });

  const phaseOrder = {
    battleIntro: "playerEnergy",
    playerEnergy: "playerTurn",
    playerTurn: "playerResult",
    playerResult: "enemyTurn",
    enemyTurn: "playerEnergy",
    // enemyResult: "playerEnergy",
  } as {
    [key: string]: string;
  };

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

  function nextPhase(): void {
    if (checkIsBattleOver()) {
      return;
    }

    battleText.value = [];

    phaseName.value = phaseOrder[phaseName.value];

    if (phaseName.value === "enemyTurn") {
      doEnemyTurn();
    }
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

  function doEnemyTurn(): void {
    // Assign energy
    battleText.value.push(
      `The ${enemy.value.template.templateName} is charging its weapons.`
    );

    enemy.value.unallocatedEnergy = enemy.value.energyPerTurn;
    const weapons: ShipSystemInstance[] = enemy.value.systems.filter(
      (s) => s.template.isWeapon
    );

    while (enemy.value.unallocatedEnergy > 0) {
      let system = weapons.randomElement();
      if (isAtMaxEnergy(system)) {
        system = enemy.value.systems
          .filter((s) => s.energyAllocated < s.template.energyNeeded)
          .randomElement();
      }
      system.energyAllocated += 1;
      enemy.value.unallocatedEnergy -= 1;
    }

    // Attack
    enemy.value.systems.forEach((system) => {
      if (isAtMaxEnergy(system)) {
        system.template.action();
        system.energyAllocated = 0;
      }
    });
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
