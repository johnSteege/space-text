<script setup lang="ts">
import { useGameStateStore } from "@/stores/gameState";
import { useBattleStore } from "@/stores/battle";
import BattlePhaseText from "./BattlePhaseText.vue";
import BattleChoice from "./BattleChoice.vue";
import { onMounted, ref } from "vue";

const gameState = useGameStateStore();
const battle = useBattleStore();

const summaryText = ref<string>("");
const nextSceneId = ref<string>("");

onMounted(() => {
  if (gameState.playerShip.hp.isAtMin()) {
    summaryText.value = "You have been defeated!";
    nextSceneId.value = "gameOver";
  } else if (battle.enemy.hp.isAtMin()) {
    summaryText.value = `The ${battle.enemy.name} has been defeated!`;
    nextSceneId.value = "dialogue1";
  } else {
    // ERROR
  }
});

function endBattle() {
  gameState.isBattle = false;
  battle.$reset();
  gameState.sceneId = nextSceneId.value;
}
</script>

<template>
  <BattlePhaseText>Summary</BattlePhaseText>

  <BattleChoice @action.once="endBattle">Continue</BattleChoice>
</template>
