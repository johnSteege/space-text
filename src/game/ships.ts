import { type ShipItem, shipItems } from "./shipItems";
import {
  makeShipSystem,
  type ShipSystem,
  type ShipSystemId,
} from "./shipSystems";
import { buildBoundedNumber, type BoundedNumber } from "./util";

export type ShipID =
  | "error"
  | "scout"
  | "kestrel"
  | "rebel_a"
  | "pirate_a"
  | "slug_a";

export type ShipSystemMap = { [key in ShipSystemId]?: ShipSystem };

export type Ship = {
  name: string;
  hp: BoundedNumber;
  turnEnergy: BoundedNumber;
  systems: ShipSystemMap; // Only one of each system can be present.
  weapons: ShipSystem[]; // Multiple weapons of the same type can be present.
  getSystemArray(includeWeapons: boolean): ShipSystem[];
  items: ShipItem[];
};

export function makeShip(id: ShipID): Ship {
  const basicSystems = {
    shields: makeShipSystem("shields", 1),
    repair: makeShipSystem("repair", 1),
    sensors: makeShipSystem("sensors", 1),
  } as { [key in ShipSystemId]: ShipSystem };

  let ship: Ship = {
    name: "ErRoR",
    hp: buildBoundedNumber(1, 0, 1),
    turnEnergy: buildBoundedNumber(1, 0, 1),
    systems: basicSystems,
    weapons: [],
    getSystemArray: function (includeWeapons: boolean): ShipSystem[] {
      return [
        ...(includeWeapons ? this.weapons : []),
        ...Object.values(this.systems),
      ];
    },
    items: [],
  };

  switch (id) {
    case "scout":
      ship.name = "Scout";
      ship.hp = buildBoundedNumber(15, 0, 15);
      ship.turnEnergy = buildBoundedNumber(2);
      ship.weapons = [
        makeShipSystem("laser1", 1),
        makeShipSystem("torpedo1", 1),
      ];
      ship.items = [shipItems.potion, shipItems.torpedo];
      break;
    case "kestrel":
      ship.name = "Kestrel";
      ship.hp = buildBoundedNumber(15, 0, 15);
      ship.turnEnergy = buildBoundedNumber(2);
      ship.weapons = [makeShipSystem("laser1", 1)];
      ship.items = [shipItems.potion, shipItems.torpedo];
      break;
    case "rebel_a":
      ship.name = "Slug";
      ship.hp = buildBoundedNumber(5, 0, 5);
      ship.turnEnergy = buildBoundedNumber(2);
      ship.weapons = [
        makeShipSystem("laser1", 1),
        makeShipSystem("torpedo1", 1),
      ];
      break;
    case "pirate_a":
      ship.name = "Slug";
      ship.hp = buildBoundedNumber(5, 0, 5);
      ship.turnEnergy = buildBoundedNumber(2);
      ship.weapons = [
        makeShipSystem("laser1", 1),
        makeShipSystem("torpedo1", 1),
      ];
      break;
    case "slug_a":
      ship.name = "Slug";
      ship.hp = buildBoundedNumber(5, 0, 5);
      ship.turnEnergy = buildBoundedNumber(2);
      ship.weapons = [
        makeShipSystem("laser1", 1),
        makeShipSystem("torpedo1", 1),
      ];
      break;
  }

  return ship;
}
