<script setup lang="ts">
import MenuBar from "@/components/MenuBar.vue";
import { useGameStateStore } from "@/stores/gameState";

const gameState = useGameStateStore();
</script>

<template>
  <MenuBar></MenuBar>
  <RouterView />
</template>
