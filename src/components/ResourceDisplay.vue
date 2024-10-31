<script setup lang="ts">
import { useGameStateStore } from "@/stores/gameState";

const gameState = useGameStateStore();
</script>

<template>
  <div>
    <span class="resource"
      >Hull:
      {{
        `${gameState.playerShip.hp}/${gameState.playerShip.template.maxHp}`
      }}</span
    >
    <span class="resource">Money: {{ gameState.playerMoney }}</span>
  </div>
</template>

<style scoped>
.resource {
  margin-right: 10px;
}
</style>
