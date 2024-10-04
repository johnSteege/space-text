<script setup lang="ts">
import { useGameStateStore } from "@/stores/gameState";

const gameState = useGameStateStore();
</script>

<template>
  <div>
    <span class="resource">Money: {{ gameState.playerMoney }}</span>
    <span class="resource">Weapons: </span>
  </div>
</template>

<style scoped>
.resource {
  display: block;
}
</style>
