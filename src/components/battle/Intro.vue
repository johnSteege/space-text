<script setup lang="ts">
import { useBattleStore } from "@/stores/battle";
import PhaseChoice from "./PhaseChoice.vue";

const battle = useBattleStore();
const enemyName = battle.enemy.template.templateName;
</script>

<template>
  Intro

  <PhaseText>{{ `A ${enemyName} has appeared!` }}</PhaseText>
  <PhaseChoice text="Start Battle" @action.once="battle.nextPhase" />
</template>
