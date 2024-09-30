<script setup lang="ts">
import { useGameStateStore } from "@/stores/gameState";
import { type Battle } from "@/game/battle";

const gameState = useGameStateStore();

defineProps<{ battle: Battle }>();
</script>

<template>
  <div style="margin-top: 10px">
    <div>{{ battle.enemy.template.name }}</div>
    <span class="resource">Health: {{ battle.enemy.health }}</span>
    <span class="resource">Block: {{ battle.enemy.block }}</span>
    <span class="resource">Attack: {{ battle.enemy.attack }}</span>
    <span class="resource">Dodge: {{ battle.enemy.dodge }}</span>
  </div>
  <div>
    <button @click="battle.enemy.health-=1">Lasers</button>
    <button @click="battle.enemy.health-=2">Missiles</button>
  </div>
</template>

<style scoped>
.resource {
  margin-right: 10px;
}
</style>
