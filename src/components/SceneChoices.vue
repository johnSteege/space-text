<script setup lang="ts">
import { type Scene, type Choice } from "@/game/scenes";

defineProps<{ sceneData: Scene }>();
defineEmits(["choice-chosen"]);
</script>

<template>
  <div v-for="choice in sceneData.choices" :key="choice.text">
    <button
      @click="
        choice.action();
        $emit('choice-chosen', choice);
      "
    >
      {{ choice.text }}
    </button>
  </div>
</template>
