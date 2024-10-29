<script setup lang="ts">
import { useGameStateStore } from "@/stores/gameState";
import { useBattleStore } from "@/stores/battle";
import PlayerEnergy from "./PlayerEnergy.vue";
import PlayerSystems from "./PlayerSystems.vue";
import PlayerResults from "./PlayerResults.vue";
import EnemyPhase from "./EnemyPhase.vue";
import Summary from "./Summary.vue";

const battle = useBattleStore();
</script>

<template>
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

  <PlayerEnergy v-if="battle.phaseName === 'playerEnergy'"> </PlayerEnergy>
  <PlayerSystems v-if="battle.phaseName === 'playerTurn'"></PlayerSystems>
  <PlayerResults v-if="battle.phaseName === 'playerResult'"></PlayerResults>
  <EnemyPhase v-if="battle.phaseName === 'enemyTurn'"></EnemyPhase>
  <Summary v-if="battle.phaseName === 'battleSummary'"></Summary>

  <div>
    <div v-for="choice in battle.choices">
      <button @click="choice.action">
        {{ choice.text }}
      </button>
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
