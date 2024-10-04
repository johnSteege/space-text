import { weapons, type Weapon } from "./shipItems";

export type ShipTemplate = {
  templateName: string;
  maxHealth: number;
  shields: number;
  evasion: number;
  startingWeapons: Weapon[];
};

export type ShipInstance = {
  template: ShipTemplate;
  name: string;
  health: number;
  shields: number;
  evasion: number;
  weapons: Weapon[];
};

export function buildShip(template: ShipTemplate): ShipInstance {
  return {
    template,
    name: template.templateName,
    health: template.maxHealth,
    shields: template.shields,
    evasion: template.evasion,
    weapons: template.startingWeapons,
  };
}

export const playerShipTemplates: Record<string, ShipTemplate> = {
  scout1: {
    templateName: "Scout",
    maxHealth: 15,
    shields: 1,
    evasion: 11,
    startingWeapons: [weapons.laser1, weapons.missile1],
  },
};

export const nullShip = buildShip({
  templateName: "ErRoR",
  maxHealth: 1,
  shields: 0,
  evasion: 0,
  startingWeapons: [],
} as ShipTemplate);
