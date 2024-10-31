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
  energyPerTurn: number;
  unallocatedEnergy: number;
  systems: ShipSystemInstance[];
  items: ShipItem[];
};

export function buildShip(template: ShipTemplate): ShipInstance {
  return {
    template,
    name: template.templateName,
    hp: template.maxHp,
    energyPerTurn: 5,
    unallocatedEnergy: 0,
    systems: template.startingSystems.map((system) =>
      buildShipSystem(system.system, system.level)
    ),
    items: template.startingItems,
  };
}

type playerShipId = "scout1" | "kestrel1";

export const playerShipTemplates = {
  scout1: {
    templateName: "Scout",
    maxHp: 15,
    startingSystems: [
      { system: shipSystems.shields, level: 1 },
      { system: shipSystems.engines, level: 1 },
      { system: shipSystems.targeting, level: 1 },
      { system: shipSystems.power, level: 1 },
      { system: shipSystems.repair, level: 1 },
      { system: shipSystems.sensors, level: 1 },
      { system: shipSystems.laser1, level: 1 },
      { system: shipSystems.torpedo1, level: 1 },
    ],
    startingItems: [shipItems.potion, shipItems.torpedo],
  },
} as {
  [key in playerShipId]: ShipTemplate;
};

type enemyShipId = "slug_1";

export const enemyTemplates = {
  slug_1: {
    templateName: "Slug Cruiser",
    maxHp: 5,
    startingSystems: [
      { system: shipSystems.shields, level: 1 },
      { system: shipSystems.engines, level: 1 },
      { system: shipSystems.targeting, level: 1 },
      { system: shipSystems.power, level: 1 },
      { system: shipSystems.repair, level: 1 },
      { system: shipSystems.sensors, level: 1 },
      { system: shipSystems.laser1, level: 1 },
      { system: shipSystems.torpedo1, level: 1 },
    ],
    startingItems: [],
  },
} as {
  [key in enemyShipId]: ShipTemplate;
};

export const nullShip = buildShip({
  templateName: "ErRoR",
  maxHp: 1,
  startingSystems: [],
  startingItems: [],
} as ShipTemplate);
