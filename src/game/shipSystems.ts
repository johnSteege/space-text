import { useGameStateStore } from "@/stores/gameState";
import { useBattleStore } from "@/stores/battle";
import {
  type BoundedNumber,
  defineBoundedNumber,
  randomIntLinear,
} from "./util";

// export type ShipSystemTemplate = {
//   name: string;
//   description: string;
//   isWeapon: boolean;
//   energyNeeded: number;
//   action: () => void;
// };

// export type ShipSystemInstance = {
//   template: ShipSystemTemplate;
//   hp: BoundedNumber;
//   energyAllocated: number;
//   phaseEnergy: number; // Temporary energy during the player energy phase
// };

// export function buildShipSystem(
//   template: ShipSystemTemplate,
//   level: number
// ): ShipSystemInstance {
//   return {
//     template: template,
//     hp: defineBoundedNumber(level),
//     energyAllocated: 0,
//     phaseEnergy: 0,
//   };
// }

export type SystemEnergy = {
  getFilled(): number;
  getTemp(): number;
  getTotal(): number; // filled + temp
  getMax(): number;
  getEmpty(): number; // max - total
  isFull(): boolean;
  resetTemp(): void; // temp = 0
  resetTotal(): void; // filled = 0, temp = 0
  addTemp(units: number): void;
  fillTemp(): void; // temp -> filled
};

export function defineSystemEnergy(maxEnergy: number): SystemEnergy {
  let _filled: number = 0;
  let _temp: number = 0;
  let _max: number = maxEnergy;

  const getFilled = () => _filled;
  const getTemp = () => _temp;
  const getMax = () => _max;
  const getTotal = () => getFilled() + getTemp();
  const getEmpty = () => getMax() - getTotal();
  const isFull = () => {
    return getEmpty() <= 0;
  };
  const resetTemp = () => {
    _temp = 0;
  };
  const resetTotal = () => {
    _filled = 0;
    _temp = 0;
  };
  const addTemp = (toAdd: number) => {
    _temp = Math.min(_temp + toAdd, getMax());
  };
  const fillTemp = () => {
    _filled += _temp;
    _temp = 0;
  };

  return {
    getFilled,
    getTemp,
    getTotal,
    getMax,
    getEmpty,
    isFull,
    resetTemp,
    resetTotal,
    addTemp,
    fillTemp,
  };
}

// export function isAtMaxEnergy(system: ShipSystemInstance): boolean {
//   return (
//     system.energyAllocated + system.phaseEnergy >= system.template.energyNeeded
//   );
// }

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

  battle.phaseDefender.hp.add(damage);
  battle.battleText.push(`${battle.phaseDefender.name} took ${damage} damage.`);
}

export type WeaponId = "laser1" | "torpedo1";

export type ShipSystemId =
  | WeaponId
  | "shields"
  | "engines"
  | "targeting"
  | "power"
  | "repair"
  | "sensors"
  | "cloaking";

export type ShipSystem = {
  name: string;
  description: string;
  isWeapon: boolean;
  action: () => void;
  hp: BoundedNumber;
  energy: SystemEnergy;
};

export function defineShipSystem(id: ShipSystemId, level: number): ShipSystem {
  let system: ShipSystem = {
    name: "NULL_SYSTEM",
    description: "NULL_SYSTEM",
    isWeapon: false,
    action: () => {},
    hp: defineBoundedNumber(level),
    energy: defineSystemEnergy(9),
  };

  switch (id) {
    case "laser1":
      system = {
        ...system,
        name: "Basic Laser",
        description: "Quick and accurate light weapon.",
        isWeapon: true,
        action: () => {
          fireWeapon(1, 1, 1);
        },
        energy: defineSystemEnergy(2),
      };
      break;
    case "torpedo1":
      system = {
        ...system,
        name: "Basic Torpedo",
        description: "Powerful but inaccurate.",
        isWeapon: true,
        action: () => {
          fireWeapon(0, 0, 3);
        },
        energy: defineSystemEnergy(3),
      };
      break;
    case "shields":
      system = {
        ...system,
        name: "Shields",
        description: "Blocks some types of weapons from reaching the ship.",
        isWeapon: false,
        action: () => {
          // Increase shield level
        },
        energy: defineSystemEnergy(4),
      };
      break;
    case "engines":
      system = {
        ...system,
        name: "Engines",
        description: "Increases the chance to dodge attacks.",
        isWeapon: false,
        action: () => {},
        energy: defineSystemEnergy(3),
      };
      break;
    case "targeting":
      system = {
        ...system,
        name: "Targeting Computer",
        description: "Improves weapon accuracy.",
        isWeapon: false,
        action: () => {},
        energy: defineSystemEnergy(2),
      };
      break;
    case "power":
      system = {
        ...system,
        name: "Reactor Power System",
        description: "Charges the reactor and provides extra power next turn.",
        isWeapon: false,
        action: () => {},
        energy: defineSystemEnergy(5),
      };
      break;
    case "repair":
      system = {
        ...system,
        name: "Repair",
        description:
          "Repairs ship systems during battle, but cannot repair damage to the hull.",
        isWeapon: false,
        action: () => {},
        energy: defineSystemEnergy(2),
      };
      break;
    case "sensors":
      system = {
        ...system,
        name: "Sensors",
        description: "Gathers information about enemy ships.",
        isWeapon: false,
        action: () => {},
        energy: defineSystemEnergy(3),
      };
      break;
    case "cloaking":
      system = {
        ...system,
        name: "Cloaking",
        description: "Grants 100% dodge for one turn.",
        isWeapon: false,
        action: () => {},
        energy: defineSystemEnergy(8),
      };
      break;
  }

  return system;
}

// const weapons = {
//   laser1: {
//     name: "Laser",
//     description: "Quick and accurate light weapon.",
//     isWeapon: true,
//     energyNeeded: 2,
//     action: () => {
//       fireWeapon(1, 1, 1);
//     },
//   },
//   torpedo1: {
//     name: "Torpedo",
//     description: "Powerful but less accurate.",
//     isWeapon: true,
//     energyNeeded: 3,
//     action: () => {
//       fireWeapon(0, 0, 3);
//     },
//   },
// } as {
//   [key in weaponId]: ShipSystemTemplate;
// };

// export const shipSystems = {
//   ...weapons,
//   shields: {
//     name: "Shields",
//     description: "Blocks some types of weapons from reaching the ship.",
//     isWeapon: false,
//     energyNeeded: 4,
//     action: () => {
//       // Increase shield level
//     },
//   },
//   engines: {
//     name: "Engines",
//     description: "Increases the chance to dodge attacks.",
//     isWeapon: false,
//     energyNeeded: 3,
//     action: () => {},
//   },
//   targeting: {
//     name: "Targeting Computer",
//     description: "Improves weapon accuracy.",
//     isWeapon: false,
//     energyNeeded: 3,
//     action: () => {},
//   },
//   power: {
//     name: "Reactor Power System",
//     description: "Charges the reactor and provides extra power next turn.",
//     isWeapon: false,
//     energyNeeded: 5,
//     action: () => {},
//   },
//   repair: {
//     name: "Repair",
//     description:
//       "Repairs ship systems during battle, but cannot repair damage to the hull.",
//     isWeapon: false,
//     energyNeeded: 2,
//     action: () => {},
//   },
//   sensors: {
//     name: "Sensors",
//     description: "Gathers information about enemy ships.",
//     isWeapon: false,
//     energyNeeded: 3,
//     action: () => {},
//   },
//   cloaking: {
//     name: "Cloaking Device",
//     description: "Grants 100% dodge for one turn.",
//     isWeapon: false,
//     energyNeeded: 8,
//     action: () => {},
//   },
// } as {
//   [key in systemId]: ShipSystemTemplate;
// };
