<script setup lang="ts">
import { useBattleStore } from "@/stores/battle";
import BattlePhaseText from "./BattlePhaseText.vue";
import BattleChoice from "./BattleChoice.vue";

const battle = useBattleStore();
</script>

<template>
  <BattlePhaseText>Player Results</BattlePhaseText>

  <BattleChoice @action.once="battle.nextPhase">Continue</BattleChoice>
</template>
