<script setup lang="ts">
const props = defineProps<{ disabled?: boolean }>();
</script>

<template>
  <div>
    <button :disabled="props.disabled" @click="$emit('action')">
      <slot></slot>
    </button>
  </div>
</template>
