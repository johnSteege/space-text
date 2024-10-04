<script setup lang="ts">
import { useGameStateStore } from "@/stores/gameState";
import { computed } from "vue";

const gameState = useGameStateStore();
const playerShip = computed(() => gameState.playerShip);
</script>

<template>
  <div>
    <span class="resource">
      {{
        `Health: ${playerShip.health}/${playerShip.template.maxHealth}`
      }}</span
    >
    <span class="resource">Shields: {{ playerShip.shields }}</span>
    <span class="resource">Evasion: {{ playerShip.evasion }}</span>
    <span class="resource">Money: {{ gameState.playerMoney }}</span>
  </div>
</template>

<style scoped>
.resource {
  display: block;
}
</style>
