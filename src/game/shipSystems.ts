import { useGameStateStore } from "@/stores/gameState";
import { useBattleStore } from "@/stores/battle";
import {
  buildBoundedNumber,
  randomIntLinear,
  type BoundedNumber,
} from "./util";

export type ShipSystemEnergy = {
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

export function makeShipSystemEnergy(maxEnergy: number): ShipSystemEnergy {
  type hidden = {
    _filled: number;
    _temp: number;
    _max: number;
  };

  const result: ShipSystemEnergy & hidden = {
    _filled: 0,
    _temp: 0,
    _max: maxEnergy,
    getFilled: function (): number {
      return this._filled;
    },
    getTemp: function (): number {
      return this._temp;
    },
    getTotal: function (): number {
      return this._filled + this._temp;
    },
    getMax: function (): number {
      return this._max;
    },
    getEmpty: function (): number {
      return this._max - this.getTotal();
    },
    isFull: function (): boolean {
      return this.getEmpty() <= 0;
    },
    resetTemp: function (): void {
      this._temp = 0;
    },
    resetTotal: function (): void {
      this._filled = 0;
      this._temp = 0;
    },
    addTemp: function (toAdd: number): void {
      this._temp = Math.min(this._temp + toAdd, this._max);
    },
    fillTemp: function (): void {
      this._filled += this._temp;
      this._temp = 0;
    },
  };

  return result;
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

  battle.phaseDefender.hp.add(0 - damage);
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
  energy: ShipSystemEnergy;
};

export function makeShipSystem(id: ShipSystemId, level: number): ShipSystem {
  let system: ShipSystem = {
    name: "NULL_SYSTEM",
    description: "NULL_SYSTEM",
    isWeapon: false,
    action: () => {},
    hp: buildBoundedNumber(level, 0, level) as BoundedNumber,
    energy: makeShipSystemEnergy(9),
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
        energy: makeShipSystemEnergy(2),
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
        energy: makeShipSystemEnergy(3),
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
        energy: makeShipSystemEnergy(4),
      };
      break;
    case "engines":
      system = {
        ...system,
        name: "Engines",
        description: "Increases the chance to dodge attacks.",
        isWeapon: false,
        action: () => {},
        energy: makeShipSystemEnergy(3),
      };
      break;
    case "targeting":
      system = {
        ...system,
        name: "Targeting Computer",
        description: "Improves weapon accuracy.",
        isWeapon: false,
        action: () => {},
        energy: makeShipSystemEnergy(2),
      };
      break;
    case "power":
      system = {
        ...system,
        name: "Reactor Power System",
        description: "Charges the reactor and provides extra power next turn.",
        isWeapon: false,
        action: () => {},
        energy: makeShipSystemEnergy(5),
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
        energy: makeShipSystemEnergy(2),
      };
      break;
    case "sensors":
      system = {
        ...system,
        name: "Sensors",
        description: "Gathers information about enemy ships.",
        isWeapon: false,
        action: () => {},
        energy: makeShipSystemEnergy(3),
      };
      break;
    case "cloaking":
      system = {
        ...system,
        name: "Cloaking",
        description: "Grants 100% dodge for one turn.",
        isWeapon: false,
        action: () => {},
        energy: makeShipSystemEnergy(8),
      };
      break;
  }

  return system;
}
