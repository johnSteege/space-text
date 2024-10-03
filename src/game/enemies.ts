import { weapons } from "./shipItems";
import { type ShipTemplate } from "./ships";

export const enemyTemplates: Record<string, ShipTemplate> = {
  slug_1: {
    templateName: "Slug Cruiser",
    maxHealth: 5,
    block: 1,
    dodge: 1,
    startingWeapons: [weapons.laser1],
  },
};
