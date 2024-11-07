<script setup lang="ts">
import { type Scene, type Choice } from "@/game/scenes";

defineProps<{ sceneData: Scene }>();
const emit = defineEmits(["choice-chosen"]);

function onChoice(choice: Choice): void {
  choice.action ? choice.action() : null;
  emit("choice-chosen", choice);
}
</script>

<template>
  <div v-for="choice in sceneData.choices" :key="choice.text">
    <button @click="onChoice(choice)">
      {{ choice.text }}
    </button>
  </div>
</template>
