import { type ShipItem, shipItems } from "./shipItems";
import {
  makeShipSystem,
  type ShipSystem,
  type ShipSystemId,
} from "./shipSystems";
import { buildBoundedNumber, type BoundedNumber } from "./util";

export type ShipID = "error" | "scout1" | "kestrel1" | "slug_1";

export type ShipSystemCollection = { [key in ShipSystemId]?: ShipSystem }; // TODO

export type Ship = {
  name: string;
  hp: BoundedNumber;
  turnEnergy: BoundedNumber;
  systems: ShipSystemCollection;
  getSystemArray(): ShipSystem[];
  getWeaponArray(): ShipSystem[];
  items: ShipItem[];
};

export function makeShip(id: ShipID): Ship {
  let ship: Ship = {
    name: "ErRoR",
    hp: buildBoundedNumber(1, 0, 1),
    turnEnergy: buildBoundedNumber(1, 0, 1),
    systems: {},
    getSystemArray: function (): ShipSystem[] {
      return Object.values(this.systems);
    },
    getWeaponArray: function (): ShipSystem[] {
      return Object.values(this.systems).filter((s) => s.isWeapon);
    },
    items: [],
  };

  const basicSystems = {
    shields: makeShipSystem("shields", 1),
    repair: makeShipSystem("repair", 1),
    sensors: makeShipSystem("sensors", 1),
  } as { [key in ShipSystemId]: ShipSystem };

  switch (id) {
    case "scout1":
      ship.name = "Scout";
      ship.hp = buildBoundedNumber(15, 0, 15);
      ship.turnEnergy = buildBoundedNumber(2);
      ship.systems = {
        ...basicSystems,
        laser1: makeShipSystem("laser1", 1),
        torpedo1: makeShipSystem("torpedo1", 1),
      };
      ship.items = [shipItems.potion, shipItems.torpedo];
      break;
    case "kestrel1":
      ship.name = "Kestrel";
      ship.hp = buildBoundedNumber(15, 0, 15);
      ship.turnEnergy = buildBoundedNumber(2);
      ship.systems = {
        ...basicSystems,
        laser1: makeShipSystem("laser1", 1),
      };
      ship.items = [shipItems.potion, shipItems.torpedo];
      break;
    case "slug_1":
      ship.name = "Slug";
      ship.hp = buildBoundedNumber(5, 0, 5);
      ship.turnEnergy = buildBoundedNumber(2);
      ship.systems = {
        ...basicSystems,
        laser1: makeShipSystem("laser1", 1),
        torpedo1: makeShipSystem("torpedo1", 1),
      };
      break;
  }

  return ship;
}
