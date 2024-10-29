<script setup lang="ts">
import { useBattleStore } from "@/stores/battle";

const props = defineProps<{ text: string }>();

const battle = useBattleStore();
</script>

<template>
  PhaseChoice

  <div>
    <button @click="$emit('action')">
      {{ props.text }}
    </button>
  </div>
</template>
