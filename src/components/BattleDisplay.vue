<script setup lang="ts">
import { useGameStateStore } from "@/stores/gameState";
import { type Battle } from "@/game/battle";
import { computed } from "vue";

const gameState = useGameStateStore();
const battle = computed(() => gameState.battle);
</script>

<template>
  <battle-display v-if="battle !== null">
    <div style="margin-top: 10px">
      <div>{{ battle.enemy.template.templateName }}</div>
      <span class="resource">Health: {{ battle.enemy.health }}</span>
      <span class="resource">Block: {{ battle.enemy.block }}</span>
      <span class="resource">Dodge: {{ battle.enemy.dodge }}</span>
    </div>
    <div>
      <weapon-display v-for="weapon in gameState.playerShip.weapons"
        ><button @click="battle.enemy.health -= weapon.damage">
          {{ weapon.name }}
        </button>
      </weapon-display>
    </div>
  </battle-display>
</template>

<style scoped>
.resource {
  margin-right: 10px;
}
weapon-display {
  margin-right: 10px;
}
</style>
