<script setup lang="ts">
import { useGameStateStore } from "@/stores/gameState";
import { type Battle } from "@/game/battle";
import { computed } from "vue";

const gameState = useGameStateStore();
const battle = computed(() => gameState.battle);
</script>

<template>
  <div v-if="battle !== null">
    <div style="margin-top: 10px">
      <div>{{ battle.enemy.template.templateName }}</div>
      <span class="resource">Health: {{ battle.enemy.health }}</span>
      <span class="resource">Shields: {{ battle.enemy.shields }}</span>
      <span class="resource">Evasion: {{ battle.enemy.evasion }}</span>
    </div>
    <div>
      {{ battle.phase }}
    </div>
    <div>
      <div v-for="text in battle.phaseText" style="margin-bottom: 10px">
        {{ text }}
      </div>
    </div>
    <div>
      <div v-for="choice in battle.choices">
        <button @click="choice.action">
          {{ choice.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resource {
  margin-right: 10px;
}
weapon-display {
  margin-right: 10px;
}
</style>
