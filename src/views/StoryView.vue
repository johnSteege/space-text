<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import ResourceDisplay from "@/components/ResourceDisplay.vue";
import SceneText from "@/components/SceneText.vue";
import SceneChoices from "@/components/SceneChoices.vue";
import { useGameStateStore } from "@/stores/gameState";
import { getScene, type Scene, type Choice } from "@/game/scenes";
import BattleDisplay from "@/components/battle/BattleDisplay.vue";

const gameState = useGameStateStore();
const sceneData = computed<Scene>(() => getScene(gameState.sceneId));

const router = useRouter();

function onChoice(choice: Choice): void {
  gameState.sceneId = choice.nextSceneId;
}
</script>

<template>
  <ResourceDisplay></ResourceDisplay>
  <div v-if="!gameState.isBattle">
    <SceneText :sceneData="sceneData"></SceneText>
    <SceneChoices
      :sceneData="sceneData"
      @choice-chosen="onChoice"
    ></SceneChoices>
  </div>
  <button v-if="gameState.sceneId === 'gameOver'" @click="router.push('/')">
    Main Menu
  </button>
  <BattleDisplay v-if="gameState.isBattle"></BattleDisplay>
</template>
