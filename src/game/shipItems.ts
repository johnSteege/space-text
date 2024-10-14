import { useGameStateStore } from "@/stores/gameState";
import { randomIntLinear } from "./util";

export type Weapon = {
  name: string;
  reloadTime: number;
  action: () => void;
};

export const weapons: Record<string, Weapon> = {
  laser1: {
    name: "Laser",
    reloadTime: 100,
    action: () => {
      fireWeapon(1, 1, 1);
    },
  },
  missile1: {
    name: "Missile",
    reloadTime: 150,
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
      gameState.battle.phaseAttacker.health = Math.min(
        gameState.battle.phaseAttacker.health + 3,
        gameState.battle.phaseAttacker.template.maxHealth
      );
    },
  },
};
