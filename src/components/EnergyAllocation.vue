<script setup lang="ts">
import { ref } from "vue";
import { useGameStateStore } from "@/stores/gameState";
import type { ShipSystemInstance } from "@/game/shipSystems";

type SystemEnergy = { system: ShipSystemInstance; tempEnergy: number };

const gameState = useGameStateStore();
const unallocatedEnergy = ref<number>(gameState.playerShip.energyPerTurn);
const systemEnergies = ref<SystemEnergy[]>([]);

function populateSystems(): void {
  systemEnergies.value = gameState.playerShip.systems.map((system) => ({
    system: system,
    tempEnergy: 0,
  }));
}
</script>

<template>
  <div>Unallocated Energy: {{ unallocatedEnergy }}</div>
  <div v-for="se in systemEnergies">
    <div>{{ se.system.template.name }}</div>
    <div>
      <button
        :disabled="se.tempEnergy <= 0"
        @click="
          se.tempEnergy -= 1;
          unallocatedEnergy += 1;
        "
      >
        -
      </button>
      <button
        :disabled="
          unallocatedEnergy <= 0 ||
          se.system.energyAllocated + se.tempEnergy >=
            se.system.template.energyNeeded
        "
        @click="
          se.tempEnergy += 1;
          unallocatedEnergy -= 1;
        "
      >
        +
      </button>
      {{ se.system.energyAllocated + se.tempEnergy }} ({{ se.tempEnergy }}) /
      {{ se.system.template.energyNeeded }}
    </div>
  </div>
</template>
