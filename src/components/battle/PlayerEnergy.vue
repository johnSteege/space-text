<script setup lang="ts">
import { useBattleStore } from "@/stores/battle";
import { useGameStateStore } from "@/stores/gameState";

const gameState = useGameStateStore();
const battle = useBattleStore();

function canContinue(): boolean {
  if (gameState.playerShip.unallocatedEnergy <= 0) {
    return true;
  }
  gameState.playerShip.systems.forEach((system) => {
    if (
      system.energyAllocated + system.phaseEnergy <
      system.template.energyNeeded
    ) {
      return false;
    }
  });
  return true;
}
</script>

<template>
  <div>Unallocated Energy: {{ gameState.playerShip.unallocatedEnergy }}</div>
  <div>
    <div
      v-for="system in gameState.playerShip.systems"
      style="display: table; border: 1px solid black; margin: 5px; padding: 5px"
    >
      <div>{{ system.template.name }}</div>
      <div>
        <button
          :disabled="system.phaseEnergy <= 0"
          @click="
            system.phaseEnergy -= 1;
            gameState.playerShip.unallocatedEnergy += 1;
          "
        >
          -
        </button>
        <button
          :disabled="
            gameState.playerShip.unallocatedEnergy <= 0 ||
            system.energyAllocated + system.phaseEnergy >=
              system.template.energyNeeded
          "
          @click="
            system.phaseEnergy += 1;
            gameState.playerShip.unallocatedEnergy -= 1;
          "
        >
          +
        </button>
        {{ system.energyAllocated + system.phaseEnergy }} ({{
          system.phaseEnergy
        }}) /
        {{ system.template.energyNeeded }}
      </div>
    </div>
  </div>
  <div>
    // TODO:
    <button :disabled="!canContinue()" @click="battle.nextPhase">
      Continue
    </button>
  </div>
</template>
