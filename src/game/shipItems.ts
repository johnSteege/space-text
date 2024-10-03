import { useGameStateStore } from "@/stores/gameState";

export type Weapon = {
  name: string;
  action: () => void;
};

export const weapons: Record<string, Weapon> = {
  laser1: {
    name: "Laser 1",
    action: () => {
      fireWeapon(1, 1);
    },
  },
  missile1: {
    name: "Missile 1",
    action: () => {
      fireWeapon(0, 3);
    },
  },
};

function fireWeapon(minDamage: number, maxDamage: number): void {
  const gameState = useGameStateStore();

  const damage =
    Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;

  gameState.battle.phaseBlocker.health -= damage;
  gameState.battle.phaseText = [`${gameState.battle.phaseBlocker.name} took ${damage} damage.`];
}
