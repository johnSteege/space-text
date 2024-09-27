<script setup lang="ts">
import { computed } from "vue";
import MenuBar from "@/components/MenuBar.vue";
import ResourceDisplay from "@/components/ResourceDisplay.vue";
import SceneText from "@/components/SceneText.vue";
import SceneChoices from "@/components/SceneChoices.vue";
import { useGameStateStore } from "@/stores/gameState";
import { getScene, type Scene } from "@/game/scenes";

const gameState = useGameStateStore();
const sceneData = computed<Scene>(() => getScene(gameState.sceneId));
</script>

<template>
  <MenuBar></MenuBar>
  <ResourceDisplay></ResourceDisplay>
  <SceneText :sceneData="sceneData"></SceneText>
  <SceneChoices></SceneChoices>
</template>
