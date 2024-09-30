<script setup lang="ts">
import { type Scene } from "@/game/scenes";

defineProps<{ sceneData: Scene }>();
</script>

<template>
  <p>{{ sceneData.text }}</p>
</template>
