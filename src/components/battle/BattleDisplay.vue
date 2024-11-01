<script setup lang="ts">
import type { Component } from "vue";
import { useBattleStore } from "@/stores/battle";
import BattlePhaseText from "./BattlePhaseText.vue";
import Intro from "./Intro.vue";
import PlayerEnergy from "./PlayerEnergy.vue";
import PlayerSystems from "./PlayerSystems.vue";
import PlayerResults from "./PlayerResults.vue";
import EnemyPhase from "./EnemyPhase.vue";
import Summary from "./Summary.vue";

const battle = useBattleStore();

const phases = {
  battleIntro: Intro,
  playerEnergy: PlayerEnergy,
  playerTurn: PlayerSystems,
  playerResult: PlayerResults,
  enemyTurn: EnemyPhase,
  enemyResult: EnemyPhase,
  battleSummary: Summary,
} as {
  [key: string]: Component;
};
</script>

<template>
  <div style="margin-top: 10px">
    <div>{{ battle.enemy.template.templateName }}</div>
    <span class="resource"
      >Hull: {{ `${battle.enemy.hp.get()}/${battle.enemy.hp.max()}` }}</span
    >
  </div>
  <div>
    {{ battle.phaseName }}
  </div>

  <BattlePhaseText v-for="text in battle.battleText">{{
    text
  }}</BattlePhaseText>

  <!-- 
  <div>
    <div v-for="text in battle.phaseText" style="margin-bottom: 10px">
      {{ text }}
    </div>
  </div> -->

  <!-- <PlayerEnergy v-if="battle.phaseName === 'playerEnergy'"> </PlayerEnergy>
  <PlayerSystems v-if="battle.phaseName === 'playerTurn'"></PlayerSystems>
  <PlayerResults v-if="battle.phaseName === 'playerResult'"></PlayerResults>
  <EnemyPhase v-if="battle.phaseName === 'enemyTurn'"></EnemyPhase>
  <Summary v-if="battle.phaseName === 'battleSummary'"></Summary> -->

  <component :is="phases[battle.phaseName]"></component>

  <!-- <div>
    <div v-for="choice in battle.choices">
      <button @click="choice.action">
        {{ choice.text }}
      </button>
    </div>
  </div> -->
</template>

<style scoped>
.resource {
  margin-right: 10px;
}
weapon-display {
  margin-right: 10px;
}
</style>
