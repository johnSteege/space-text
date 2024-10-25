import { useGameStateStore } from "@/stores/gameState";
import { randomIntLinear } from "./util";
import { getPhaseDefender } from "./battle";

export type ShipSystemTemplate = {
  name: string;
  description: string;
  isWeapon: boolean;
  energyNeeded: number;
  action: () => void;
};

export type ShipSystemInstance = {
  template: ShipSystemTemplate;
  hp: number;
  energyAllocated: number;
};

export function buildShipSystem(
  template: ShipSystemTemplate,
  level: number
): ShipSystemInstance {
  return {
    template: template,
    hp: level,
    energyAllocated: 0,
  };
}

export function fireWeapon(
  accuracyModifier: number,
  minDamage: number,
  maxDamage: number
): void {
  const gameState = useGameStateStore();

  // const evasion = Math.max(0, getPhaseDefender().evasion - accuracyModifier);
  const evasion = Math.max(0, 90 - accuracyModifier);
  const hitChance = 100 - 5 * evasion;
  const evadeRoll = randomIntLinear(0, 100);

  console.log(`evadeRoll: ${evadeRoll}, hitChance: ${hitChance}`);

  if (evadeRoll > hitChance) {
    // miss
    gameState.battle.phaseText = [
      `${getPhaseDefender().name} evaded the attack.`,
    ];
    return;
  }

  const damage = randomIntLinear(minDamage, maxDamage);

  getPhaseDefender().hp -= damage;
  gameState.battle.phaseText = [
    `${getPhaseDefender().name} took ${damage} damage.`,
  ];
}

// TODO replace these Records with something that provides completion and throws errors if a system is missing
const weapons: Record<string, ShipSystemTemplate> = {
  laser1: {
    name: "Laser",
    description: "Blocked by shields.",
    isWeapon: true,
    energyNeeded: 2,
    action: () => {
      fireWeapon(1, 1, 1);
    },
  },
  torpedo1: {
    name: "Torpedo",
    description: "Ignores shields.",
    isWeapon: true,
    energyNeeded: 3,
    action: () => {
      fireWeapon(0, 0, 3);
    },
  },
};

export const shipSystems: Record<string, ShipSystemTemplate> = {
  ...weapons,
  shields: {
    name: "Shields",
    description: "Blocks some types of weapons from reaching the ship.",
    isWeapon: false,
    energyNeeded: 4,
    action: () => {
      // Increase shield level
    },
  },
  engines: {
    name: "Engines",
    description: "Increases the chance to dodge attacks.",
    isWeapon: false,
    energyNeeded: 3,
    action: () => {},
  },
  targeting: {
    name: "Targeting Computer",
    description: "Improves weapon accuracy.",
    isWeapon: false,
    energyNeeded: 3,
    action: () => {},
  },
  power: {
    name: "Reactor Power System",
    description: "Charges the reactor and provides extra power next turn.",
    isWeapon: false,
    energyNeeded: 5,
    action: () => {},
  },
  repair: {
    name: "Repair",
    description:
      "Repairs ship systems during battle, but cannot repair damage to the hull.",
    isWeapon: false,
    energyNeeded: 2,
    action: () => {},
  },
  sensors: {
    name: "Sensors",
    description: "Gathers information about enemy ships.",
    isWeapon: false,
    energyNeeded: 3,
    action: () => {},
  },
  cloaking: {
    name: "Cloaking Device",
    description: "Grants 100% dodge for one turn.",
    isWeapon: false,
    energyNeeded: 8,
    action: () => {},
  },
};
