<script setup lang="ts">
import { useGameStateStore } from "@/stores/gameState";

const gameState = useGameStateStore();
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
</template>
