<script setup lang="ts">
import { ref } from "vue";
import { useGameStateStore } from "@/stores/gameState";
import { useBattleStore } from "@/stores/battle";
import BattlePhaseText from "./BattlePhaseText.vue";
import BattleChoice from "./BattleChoice.vue";
import type { ShipSystem } from "@/game/shipSystems";

const gameState = useGameStateStore();
const battle = useBattleStore();

function doSystemAction(system: ShipSystem): void {
  system.energy.resetTotal();
  system.action();
}

const systemArray = ref<ShipSystem[]>(gameState.playerShip.getSystemArray());
</script>

<template>
  <BattlePhaseText>System Actions</BattlePhaseText>

  <div v-for="(system, index) in systemArray" :key="index">
    <BattleChoice
      :disabled="!system.energy.isFull()"
      @action.once="doSystemAction(system)"
      >{{ system.name }}</BattleChoice
    >
    <span>Charges: {{ system.charge }}</span>
  </div>

  <BattleChoice @action.once="battle.nextPhase">Continue</BattleChoice>
</template>
