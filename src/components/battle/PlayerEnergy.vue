<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useBattleStore } from "@/stores/battle";
import { useGameStateStore } from "@/stores/gameState";
import BattleChoice from "./BattleChoice.vue";
import BattlePhaseText from "./BattlePhaseText.vue";
import type { ShipSystem } from "@/game/shipSystems";

const gameState = useGameStateStore();
const battle = useBattleStore();

onMounted(() => {
  initPhaseEnergy();
});

function initPhaseEnergy(): void {
  gameState.playerShip.turnEnergy.setToMax();
  gameState.playerShip.systems.forEach((system) => {
    system.energy.resetTemp();
  });
}

function applyPhaseEnergy(): void {
  gameState.playerShip.systems.forEach((system) => {
    system.energy.fillTemp();
  });

  battle.nextPhase();
}

const canAllocateEnergy = computed<boolean>(() => {
  return (
    gameState.playerShip.turnEnergy.get() > 0 &&
    gameState.playerShip.systems.some((s) => s.energy.getEmpty() > 0)
  );
});

function addTempEnergy(system: ShipSystem, amount: number): void {
  console.log(system.name);
  system.energy.addTemp(amount);
  gameState.playerShip.turnEnergy.add(0 - amount);
}
</script>

<template>
  <BattlePhaseText>Allocate Reactor Energy</BattlePhaseText>
  <BattlePhaseText
    >Unallocated Energy:
    {{ gameState.playerShip.turnEnergy.get() }}</BattlePhaseText
  >
  <div>
    <div
      v-for="system in gameState.playerShip.systems as ShipSystem[]"
      style="display: table; border: 1px solid black; margin: 5px; padding: 5px"
    >
      <div>{{ system.name }}</div>
      <div>
        <button
          :disabled="system.energy.getTemp() <= 0"
          @click="addTempEnergy(system, -1)"
        >
          -
        </button>
        <button
          :disabled="
            gameState.playerShip.turnEnergy.get() <= 0 || system.energy.isFull()
          "
          @click="addTempEnergy(system, 1)"
        >
          +
        </button>
        {{ system.energy.getTotal() }} ({{ system.energy.getTemp() }}) /
        {{ system.energy.getMax() }}
      </div>
    </div>
  </div>
  <!-- <div>
    <button :disabled="!canContinue()" @click="battle.nextPhase">
      Continue
    </button>
  </div> -->
  <BattleChoice :disabled="canAllocateEnergy" @action.once="applyPhaseEnergy"
    >Continue</BattleChoice
  >
  <BattleChoice @action.once="applyPhaseEnergy">Skip</BattleChoice>
</template>
