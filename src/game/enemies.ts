import { type ShipTemplate } from "./ships";

export const enemyTemplates: Record<string, ShipTemplate> = {
  slug_1: {
    templateName: "Slug Cruiser",
    maxHealth: 5,
    block: 1,
    dodge: 1,
    startingWeapons: [
      {
        name: "Laser 1",
        damage: 1,
      },
    ],
  },
};
