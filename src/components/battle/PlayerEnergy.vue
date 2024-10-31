<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useBattleStore } from "@/stores/battle";
import { useGameStateStore } from "@/stores/gameState";
import BattleChoice from "./BattleChoice.vue";
import BattlePhaseText from "./BattlePhaseText.vue";
import { isAtMaxEnergy } from "@/game/shipSystems";

const gameState = useGameStateStore();
const battle = useBattleStore();

onMounted(() => {
  initPhaseEnergy();
});

function initPhaseEnergy(): void {
  gameState.playerShip.unallocatedEnergy = gameState.playerShip.energyPerTurn;
  gameState.playerShip.systems.forEach((system) => {
    system.phaseEnergy = 0;
  });
}

function applyPhaseEnergy(): void {
  gameState.playerShip.systems.forEach((system) => {
    system.energyAllocated += system.phaseEnergy;
    system.phaseEnergy = 0;
  });

  battle.nextPhase();
}

// const disableContinue = ref<boolean>(true);
// watch(gameState.playerShip.unallocatedEnergy, () => {
//   if (gameState.playerShip.unallocatedEnergy <= 0) {
//     console.log("a");
//     return false;
//   }
//   // Check if all systems are already full of energy
//   gameState.playerShip.systems.forEach((system) => {
//     if (
//       system.energyAllocated + system.phaseEnergy <
//       system.template.energyNeeded
//     ) {
//       console.log("b");
//       return true;
//     }
//   });
//   console.log("c");
//   return false;

// });

const canAllocateEnergy = computed<boolean>(() => {
  return (
    gameState.playerShip.unallocatedEnergy > 0 &&
    gameState.playerShip.systems.some(
      (s) => s.energyAllocated + s.phaseEnergy < s.template.energyNeeded
    )
  );
});
</script>

<template>
  <BattlePhaseText>Allocate Reactor Energy</BattlePhaseText>
  <BattlePhaseText
    >Unallocated Energy:
    {{ gameState.playerShip.unallocatedEnergy }}</BattlePhaseText
  >
  <div>
    <div
      v-for="system in gameState.playerShip.systems"
      style="display: table; border: 1px solid black; margin: 5px; padding: 5px"
    >
      <div>{{ system.template.name }}</div>
      <div>
        <button
          :disabled="system.phaseEnergy <= 0"
          @click="
            system.phaseEnergy -= 1;
            gameState.playerShip.unallocatedEnergy += 1;
          "
        >
          -
        </button>
        <button
          :disabled="
            gameState.playerShip.unallocatedEnergy <= 0 || isAtMaxEnergy(system)
          "
          @click="
            system.phaseEnergy += 1;
            gameState.playerShip.unallocatedEnergy -= 1;
          "
        >
          +
        </button>
        {{ system.energyAllocated + system.phaseEnergy }} ({{
          system.phaseEnergy
        }}) /
        {{ system.template.energyNeeded }}
      </div>
    </div>
  </div>
  <!-- <div>
    <button :disabled="!canContinue()" @click="battle.nextPhase">
      Continue
    </button>
  </div> -->
  <BattleChoice :disabled="canAllocateEnergy" @action.once="applyPhaseEnergy"
    >Continue</BattleChoice
  >
</template>
