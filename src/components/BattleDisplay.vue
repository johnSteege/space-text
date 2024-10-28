<script setup lang="ts">
import { computed } from "vue";
import { useGameStateStore } from "@/stores/gameState";
import { useBattleStore } from "@/stores/battle";
import EnergyAllocation from "./EnergyAllocation.vue";

const gameState = useGameStateStore();
const battle = useBattleStore();
</script>

<template>
  <div v-if="gameState.isBattle">
    <div style="margin-top: 10px">
      <div>{{ battle.enemy.template.templateName }}</div>
      <span class="resource"
        >Hull: {{ `${battle.enemy.hp}/${battle.enemy.template.maxHp}` }}</span
      >
    </div>
    <div>
      {{ battle.phaseName }}
    </div>
    <div>
      <div v-for="text in battle.phaseText" style="margin-bottom: 10px">
        {{ text }}
      </div>
    </div>

    <EnergyAllocation v-if="battle.phaseName === 'playerEnergy'">
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
