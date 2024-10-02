<script setup lang="ts">
import { type Scene } from "@/game/scenes";

defineProps<{ sceneData: Scene }>();
</script>

<template>
  <div>SceneText</div>
  <p>{{ sceneData.text }}</p>
</template>
