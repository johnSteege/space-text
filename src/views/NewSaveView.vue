<script setup lang="ts">
import { useRouter } from "vue-router";
import { useGameStateStore } from "@/stores/gameState";
import { makeShip, type ShipID } from "@/game/ships";

const router = useRouter();
const gameState = useGameStateStore();

function newSave(shipId: ShipID): void {
  gameState.$reset();
  gameState.playerShip = makeShip(shipId);
  gameState.sceneId = "intro";

  router.push("/game/story");
}
</script>

<template>
  <button @click="router.back()">Back</button>

  <h1>New Game</h1>
  <h2>Choose Ship</h2>

  <button @click="newSave('scout1')">Scout</button>
  <button @click="newSave('kestrel1')">Kestrel</button>
</template>

<style scoped>
button {
  margin: 10px;
}
</style>
