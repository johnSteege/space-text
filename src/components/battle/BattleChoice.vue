<script setup lang="ts">
const props = defineProps<{ disabled?: boolean }>();
</script>

<template>
  <span>
    <button :disabled="props.disabled" @click="$emit('action')">
      <slot></slot>
    </button>
  </span>
</template>
