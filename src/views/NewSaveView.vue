<script setup lang="ts">
import { useRouter } from "vue-router";
import { useGameStateStore } from "@/stores/gameState";

const router = useRouter();
const gameState = useGameStateStore();

function newSave(ship: string): void {
  gameState.reset();
  gameState.sceneId = "intro";

  router.push("/game/story");
}
</script>

<template>
  <button @click="router.back()">Back</button>

  <h1>New Game</h1>
  <h2>Choose Ship</h2>

  <button @click="newSave('scout')">Scout</button>
  <button @click="newSave('kestrel')">Kestrel</button>
</template>

<style scoped>
button {
  margin: 10px;
}
</style>
