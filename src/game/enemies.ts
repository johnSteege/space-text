import { type ShipTemplate } from "./ships";
import { shipSystems } from "./shipSystems";

export const enemyTemplates: Record<string, ShipTemplate> = {
  slug_1: {
    templateName: "Slug Cruiser",
    maxHp: 5,
    startingSystems: [
      { system: shipSystems.shields, level: 1 },
      { system: shipSystems.engines, level: 1 },
      { system: shipSystems.targeting, level: 1 },
      { system: shipSystems.weapon_loading, level: 1 },
      { system: shipSystems.power, level: 1 },
      { system: shipSystems.laser1, level: 1 },
    ],
    startingItems: [],
  },
};
