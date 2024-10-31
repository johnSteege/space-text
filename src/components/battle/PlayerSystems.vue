<script setup lang="ts">
import { useGameStateStore } from "@/stores/gameState";
import { useBattleStore } from "@/stores/battle";
import BattlePhaseText from "./BattlePhaseText.vue";
import BattleChoice from "./BattleChoice.vue";
import type { ShipSystemInstance } from "@/game/shipSystems";

const gameState = useGameStateStore();
const battle = useBattleStore();

// TODO: allow weapons to target enemy systems

function doSystemAction(system: ShipSystemInstance): void {
  system.energyAllocated = 0;
  system.template.action();
}
</script>

<template>

  <BattlePhaseText>System Actions</BattlePhaseText>

  <BattleChoice
    v-for="(system, index) in gameState.playerShip.systems"
    :key="index"
    :disabled="system.energyAllocated < system.template.energyNeeded"
    @action.once="doSystemAction(system)"
    >{{ system.template.name }}</BattleChoice
  >

  <BattleChoice @action.once="battle.nextPhase">Continue</BattleChoice>
</template>
