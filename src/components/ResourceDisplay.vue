<script setup lang="ts">
import { useGameStateStore } from "@/stores/gameState";

const gameState = useGameStateStore();
</script>

<template>
  <div>
    <span class="resource"
      >Health:
      {{ gameState.playerHealth + "/" + gameState.playerMaxHealth }}</span
    >
    <span class="resource">Block: {{ gameState.playerBlock }}</span>
    <span class="resource">Attack: {{ gameState.playerAttack }}</span>
    <span class="resource">Dodge: {{ gameState.playerDodge }}</span>
    <span class="resource">Money: {{ gameState.playerMoney }}</span>
  </div>
</template>

<style scoped>
.resource {
  margin-right: 10px;
}
</style>
