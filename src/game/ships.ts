import { type ShipItem, shipItems } from "./shipItems";
import {
  buildShipSystem,
  shipSystems,
  type ShipSystemInstance,
  type ShipSystemTemplate,
} from "./shipSystems";

export type ShipTemplate = {
  templateName: string;
  maxHp: number;
  startingSystems: { system: ShipSystemTemplate; level: number }[];
  startingItems: ShipItem[]; // TODO: add amounts
};

export type ShipInstance = {
  template: ShipTemplate;
  name: string;
  hp: number;
  systems: ShipSystemInstance[];
  items: ShipItem[];
};

export function buildShip(template: ShipTemplate): ShipInstance {
  return {
    template,
    name: template.templateName,
    hp: template.maxHp,
    systems: template.startingSystems.map((system) =>
      buildShipSystem(system.system, system.level)
    ),
    items: template.startingItems,
  };
}

export const playerShipTemplates: Record<string, ShipTemplate> = {
  scout1: {
    templateName: "Scout",
    maxHp: 15,
    startingSystems: [
      { system: shipSystems.shields, level: 1 },
      { system: shipSystems.engines, level: 1 },
      { system: shipSystems.targeting, level: 1 },
      { system: shipSystems.weapon_loading, level: 1 },
      { system: shipSystems.power, level: 1 },
      { system: shipSystems.laser1, level: 1 },
      { system: shipSystems.torpedo1, level: 1 },
    ],
    startingItems: [shipItems.potion, shipItems.torpedo],
  },
};

export const nullShip = buildShip({
  templateName: "ErRoR",
  maxHp: 1,
  startingSystems: [],
  startingWeapons: [],
  startingItems: [],
} as ShipTemplate);
