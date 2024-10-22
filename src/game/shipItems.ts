import { useGameStateStore } from "@/stores/gameState";

export type ShipItem = {
  name: string;
  description: string;
  action: () => void;
};

export const shipItems: Record<string, ShipItem> = {
  potion: {
    name: "Hull Reinforcement",
    description: "Restores a small amount of hull integrity.",
    action: () => {
      const gameState = useGameStateStore();
      gameState.battle.phaseAttacker.hp = Math.min(
        gameState.battle.phaseAttacker.hp + 3,
        gameState.battle.phaseAttacker.template.maxHp
      );
    },
  },
  torpedo: {
    name: "Torpedo",
    description: "Consumed when firing torpedo weapons.",
    action: () => {
      const gameState = useGameStateStore();
    },
  },
};
