<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function newSave(difficulty: string): void {
  router.push("/game");
}
</script>

<template>
  <button @click="router.back()">Back</button>

  <h1>New Game</h1>

  <button @click="newSave('easy')">Easy</button>
  <button @click="newSave('hard')">Hard</button>
</template>

<style scoped>
button {
  margin: 10px;
}
</style>
