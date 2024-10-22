import { fireWeapon } from "./battle";

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
  energyCharged: number;
};

export function buildShipSystem(
  template: ShipSystemTemplate,
  level: number
): ShipSystemInstance {
  return {
    template: template,
    hp: level,
    energyCharged: 0,
  };
}

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
