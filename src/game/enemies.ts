import { weapons } from "./shipItems";
import { type ShipTemplate } from "./ships";
import { shipSystems } from "./shipSystems";

export const enemyTemplates: Record<string, ShipTemplate> = {
  slug_1: {
    templateName: "Slug Cruiser",
    maxHealth: 5,
    shields: 1,
    evasion: 1,
    startingWeapons: [weapons.laser1],
    startingSystems: [
      { system: shipSystems.shields, level: 1 },
      { system: shipSystems.engines, level: 1 },
      { system: shipSystems.targeting, level: 1 },
      { system: shipSystems.weapon_loading, level: 1 },
      { system: shipSystems.power, level: 1 },
    ],
  },
};
