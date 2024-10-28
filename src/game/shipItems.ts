import { useBattleStore } from "@/stores/battle";
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
      const battle = useBattleStore();
      battle.phaseAttacker.hp = Math.min(
        battle.phaseAttacker.hp + 3,
        battle.phaseAttacker.template.maxHp
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
