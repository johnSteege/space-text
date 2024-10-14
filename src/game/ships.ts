import { weapons, type Weapon, type ShipItem, shipItems } from "./shipItems";
import {
  buildShipSystem,
  shipSystems,
  type ShipSystemInstance,
  type ShipSystemTemplate,
} from "./shipSystems";

export type ShipTemplate = {
  templateName: string;
  maxHealth: number;
  shields: number;
  evasion: number;
  startingSystems: { system: ShipSystemTemplate; level: number }[];
  startingWeapons: Weapon[];
  startingItems: ShipItem[];
};

export type ShipInstance = {
  template: ShipTemplate;
  name: string;
  health: number;
  shields: number;
  evasion: number;
  systems: ShipSystemInstance[];
  weapons: Weapon[];
  items: ShipItem[];
};

export function buildShip(template: ShipTemplate): ShipInstance {
  return {
    template,
    name: template.templateName,
    health: template.maxHealth,
    shields: template.shields,
    evasion: template.evasion,
    systems: template.startingSystems.map((system) =>
      buildShipSystem(system.system, system.level)
    ),
    weapons: template.startingWeapons,
    items: template.startingItems,
  };
}

export const playerShipTemplates: Record<string, ShipTemplate> = {
  scout1: {
    templateName: "Scout",
    maxHealth: 15,
    shields: 1,
    evasion: 11,
    startingSystems: [
      { system: shipSystems.shields, level: 1 },
      { system: shipSystems.engines, level: 1 },
      { system: shipSystems.targeting, level: 1 },
      { system: shipSystems.weapon_loading, level: 1 },
      { system: shipSystems.power, level: 1 },
    ],
    startingWeapons: [weapons.laser1, weapons.missile1],
    startingItems: [shipItems.potion],
  },
};

export const nullShip = buildShip({
  templateName: "ErRoR",
  maxHealth: 1,
  shields: 0,
  evasion: 0,
  startingSystems: [],
  startingWeapons: [],
  startingItems: [],
} as ShipTemplate);
