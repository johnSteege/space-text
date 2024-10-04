import { useGameStateStore } from "@/stores/gameState";
import { randomIntLinear } from "./util";

export type Weapon = {
  name: string;
  action: () => void;
};

export const weapons: Record<string, Weapon> = {
  laser1: {
    name: "Laser",
    action: () => {
      fireWeapon(1, 1, 1);
    },
  },
  missile1: {
    name: "Missile",
    action: () => {
      fireWeapon(0, 0, 3);
    },
  },
};

function fireWeapon(
  accuracyModifier: number,
  minDamage: number,
  maxDamage: number
): void {
  const gameState = useGameStateStore();

  const evasion = Math.max(
    0,
    gameState.battle.phaseDefender.evasion - accuracyModifier
  );
  const hitChance = 100 - 5 * evasion;
  const evadeRoll = randomIntLinear(0, 100);

  console.log(`evadeRoll: ${evadeRoll}, hitChance: ${hitChance}`);

  if (evadeRoll > hitChance) {
    // miss
    gameState.battle.phaseText = [
      `${gameState.battle.phaseDefender.name} evaded the attack.`,
    ];
    return;
  }

  const damage = randomIntLinear(minDamage, maxDamage);

  gameState.battle.phaseDefender.health -= damage;
  gameState.battle.phaseText = [
    `${gameState.battle.phaseDefender.name} took ${damage} damage.`,
  ];
}
