import { type ShipItem, shipItems } from "./shipItems";
import {
  defineShipSystem,
  type ShipSystem,
  type ShipSystemId,
} from "./shipSystems";
import { defineBoundedNumber, type BoundedNumber } from "./util";

// TODO: replace templates with id, type, define
export type ShipTemplate = {
  templateName: string;
  maxHp: number;
  startingSystems: { system: ShipSystemId; level: number }[];
  startingItems: ShipItem[]; // TODO: add amounts
};

export type ShipInstance = {
  template: ShipTemplate;
  name: string;
  hp: BoundedNumber;
  energyPerTurn: number;
  unallocatedEnergy: number;
  systems: ShipSystem[];
  items: ShipItem[];
};

export function buildShip(template: ShipTemplate): ShipInstance {
  return {
    template,
    name: template.templateName,
    hp: defineBoundedNumber(template.maxHp),
    energyPerTurn: 5,
    unallocatedEnergy: 0,
    systems: template.startingSystems.map((system) =>
      defineShipSystem(system.system, system.level)
    ),
    items: template.startingItems,
  };
}

type playerShipId = "scout1" | "kestrel1";

export const playerShipTemplates = {
  scout1: {
    templateName: "Scout",
    maxHp: 2,
    startingSystems: [
      { system: "shields", level: 1 },
      { system: "engines", level: 1 },
      { system: "targeting", level: 1 },
      { system: "power", level: 1 },
      { system: "repair", level: 1 },
      { system: "sensors", level: 1 },
      { system: "laser1", level: 1 },
      { system: "torpedo1", level: 1 },
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
      { system: "shields", level: 1 },
      { system: "engines", level: 1 },
      { system: "targeting", level: 1 },
      { system: "power", level: 1 },
      { system: "repair", level: 1 },
      { system: "sensors", level: 1 },
      { system: "laser1", level: 1 },
      { system: "torpedo1", level: 1 },
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
