<script setup lang="ts">
import { computed } from "vue";
import ResourceDisplay from "@/components/ResourceDisplay.vue";
import SceneText from "@/components/SceneText.vue";
import SceneChoices from "@/components/SceneChoices.vue";
import { useGameStateStore } from "@/stores/gameState";
import { getScene, type Scene, type Choice } from "@/game/scenes";
import BattleDisplay from "@/components/BattleDisplay.vue";

const gameState = useGameStateStore();
const sceneData = computed<Scene>(() => getScene(gameState.sceneId));

function onChoice(choice: Choice): void {
  gameState.sceneId = choice.nextSceneId;
}
</script>

<template>
  <ResourceDisplay></ResourceDisplay>
  <div v-if="gameState.battle === null">
    <SceneText :sceneData="sceneData"></SceneText>
    <SceneChoices
      :sceneData="sceneData"
      @choice-chosen="onChoice"
    ></SceneChoices>
  </div>
  <BattleDisplay
    v-if="gameState.battle !== null"
    :battle="gameState.battle"
  ></BattleDisplay>
</template>
