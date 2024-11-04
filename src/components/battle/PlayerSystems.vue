<script setup lang="ts">
import { useGameStateStore } from "@/stores/gameState";
import { useBattleStore } from "@/stores/battle";
import BattlePhaseText from "./BattlePhaseText.vue";
import BattleChoice from "./BattleChoice.vue";
import type { ShipSystem } from "@/game/shipSystems";

const gameState = useGameStateStore();
const battle = useBattleStore();

// TODO: allow weapons to target enemy systems

function doSystemAction(system: ShipSystem): void {
  system.energy.resetTotal();
  system.action();
}
</script>

<template>
  <BattlePhaseText>System Actions</BattlePhaseText>

  <BattleChoice
    v-for="(system, index) in gameState.playerShip.systems"
    :key="index"
    :disabled="!system.energy.isFull()"
    @action.once="doSystemAction(system)"
    >{{ system.name }}</BattleChoice
  >

  <BattleChoice @action.once="battle.nextPhase">Continue</BattleChoice>
</template>
