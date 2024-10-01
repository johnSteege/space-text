import type { ShipInstance, ShipTemplate } from "./ships";
import { buildShip } from "./ships";

export type Battle = {
  enemy: ShipInstance;
};

export function newBattle(enemyTemplate: ShipTemplate): Battle {
  const enemy: ShipInstance = buildShip(enemyTemplate);
  return {
    enemy,
  };
}
