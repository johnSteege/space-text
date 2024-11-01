import { useGameStateStore } from "@/stores/gameState";
import {
  createBoundedNumber,
  randomIntLinear,
  type BoundedNumber,
} from "./util";
import { useBattleStore } from "@/stores/battle";

export type ShipSystemTemplate = {
  name: string;
  description: string;
  isWeapon: boolean;
  energyNeeded: number;
  action: () => void;
};

export type ShipSystemInstance = {
  template: ShipSystemTemplate;
  hp: BoundedNumber;
  energyAllocated: number;
  phaseEnergy: number; // Temporary energy during the player energy phase
};

export function buildShipSystem(
  template: ShipSystemTemplate,
  level: number
): ShipSystemInstance {
  return {
    template: template,
    hp: createBoundedNumber(level, 0, level),
    energyAllocated: 0,
    phaseEnergy: 0,
  };
}

export function isAtMaxEnergy(system: ShipSystemInstance): boolean {
  return (
    system.energyAllocated + system.phaseEnergy >= system.template.energyNeeded
  );
}

export function fireWeapon(
  accuracyModifier: number,
  minDamage: number,
  maxDamage: number
): void {
  const gameState = useGameStateStore();
  const battle = useBattleStore();

  const evasion = Math.max(0, 3 - accuracyModifier);
  const hitChance = 100 - 5 * evasion;
  const evadeRoll = randomIntLinear(0, 100);

  console.log(`evadeRoll: ${evadeRoll}, hitChance: ${hitChance}`);

  if (evadeRoll > hitChance) {
    // miss
    battle.battleText.push(`${battle.phaseDefender.name} evaded the attack.`);
    return;
  }

  const damage = randomIntLinear(minDamage, maxDamage);

  battle.phaseDefender.hp -= damage;
  battle.battleText.push(`${battle.phaseDefender.name} took ${damage} damage.`);
}

type weaponId = "laser1" | "torpedo1";

const weapons = {
  laser1: {
    name: "Laser",
    description: "Quick and accurate light weapon.",
    isWeapon: true,
    energyNeeded: 2,
    action: () => {
      fireWeapon(1, 1, 1);
    },
  },
  torpedo1: {
    name: "Torpedo",
    description: "Powerful but less accurate.",
    isWeapon: true,
    energyNeeded: 3,
    action: () => {
      fireWeapon(0, 0, 3);
    },
  },
} as {
  [key in weaponId]: ShipSystemTemplate;
};

type systemId =
  | weaponId
  | "shields"
  | "engines"
  | "targeting"
  | "power"
  | "repair"
  | "sensors";

export const shipSystems = {
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
} as {
  [key in systemId]: ShipSystemTemplate;
};
