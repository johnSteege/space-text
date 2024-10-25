<script setup lang="ts">
import { useGameStateStore } from "@/stores/gameState";
import { computed } from "vue";

const gameState = useGameStateStore();
const playerShip = computed(() => gameState.playerShip);
</script>

<template>
  <div>
    <span class="resource"
      >Hull:
      {{ `${playerShip.hp}/${playerShip.template.maxHp}` }}</span
    >
    <span class="resource">Money: {{ gameState.playerMoney }}</span>
  </div>
</template>

<style scoped>
.resource {
  margin-right: 10px;
}
</style>
