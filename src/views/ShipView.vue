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
    <span class="resource">Block: {{ playerShip.block }}</span>
    <span class="resource">Dodge: {{ playerShip.dodge }}</span>
    <span class="resource">Gold: {{ gameState.playerMoney }}</span>
  </div>
</template>

<style scoped>
.resource {
  display: block;
}
</style>
