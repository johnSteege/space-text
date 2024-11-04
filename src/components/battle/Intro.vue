<script setup lang="ts">
import { useBattleStore } from "@/stores/battle";
import BattlePhaseText from "./BattlePhaseText.vue";
import BattleChoice from "./BattleChoice.vue";

const battle = useBattleStore();
const enemyName = battle.enemy.name;
</script>

<template>
  Intro

  <BattlePhaseText>{{ `A ${enemyName} has appeared!` }}</BattlePhaseText>
  <BattleChoice @action.once="battle.nextPhase">Start Battle</BattleChoice>
</template>
