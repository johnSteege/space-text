import { weapons } from "./shipItems";

export type ShipSystemTemplate = {
  name: string;
  description: string;
};

export type ShipSystemInstance = {
  templateName: string;
  hp: number;
};

export const shipSystems: Record<string, ShipSystemTemplate> = {
  shields: {
    name: "Shields",
    description: "Blocks some types of weapons from reaching the ship.",
  },
  engines: {
    name: "Engines",
    description: "Allows the ship to dodge attacks.",
  },
  targeting: {
    name: "Targeting Computer",
    description: "Improves weapon accuracy.",
  },
  weapon_loading: {
    name: "Weapon Loading",
    description: "Improves speed of reloading weapons.",
  },
  power: {
    name: "Power System",
    description:
      "Required for operating some types of weapons and other ship systems.",
  },
  repair: {
    name: "Repair",
    description:
      "Repairs ship systems during battle, but cannot repair damage to the hull.",
  },
};

export function buildShipSystem(
  template: ShipSystemTemplate,
  level: number
): ShipSystemInstance {
  return {
    templateName: template.name,
    hp: level,
  };
}
