<script setup lang="ts">
import { computed } from "vue";
import { useGameStateStore } from "@/stores/gameState";
import EnergyAllocation from "./EnergyAllocation.vue";

const gameState = useGameStateStore();
const battle = computed(() => gameState.battle);
</script>

<template>
  <div v-if="battle !== null">
    <div style="margin-top: 10px">
      <div>{{ battle.enemy.template.templateName }}</div>
      <span class="resource"
        >Hull: {{ `${battle.enemy.hp}/${battle.enemy.template.maxHp}` }}</span
      >
    </div>
    <div>
      {{ battle.phase }}
    </div>
    <div>
      <div v-for="text in battle.phaseText" style="margin-bottom: 10px">
        {{ text }}
      </div>
    </div>

    <EnergyAllocation v-if="battle.phase === 'playerEnergy'">
    </EnergyAllocation>
    <div>
      <div v-for="choice in battle.choices">
        <button @click="choice.action">
          {{ choice.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resource {
  margin-right: 10px;
}
weapon-display {
  margin-right: 10px;
}
</style>
