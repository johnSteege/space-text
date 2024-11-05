import { type ShipItem, shipItems } from "./shipItems";
import { makeShipSystem, type ShipSystem } from "./shipSystems";
import { buildBoundedNumber, type BoundedNumber } from "./util";

export type ShipID = "error" | "scout1" | "kestrel1" | "slug_1";

export type Ship = {
  name: string;
  hp: BoundedNumber;
  turnEnergy: BoundedNumber;
  systems: ShipSystem[];
  items: ShipItem[];
};

export function makeShip(id: ShipID): Ship {
  let ship: Ship = {
    name: "ErRoR",
    hp: buildBoundedNumber(1, 0, 1),
    turnEnergy: buildBoundedNumber(1, 0, 1),
    systems: [],
    items: [],
  };

  const standardSystems = [
    makeShipSystem("shields", 1),
    makeShipSystem("engines", 1),
    makeShipSystem("targeting", 1),
    makeShipSystem("power", 1),
    makeShipSystem("repair", 1),
    makeShipSystem("sensors", 1),
  ];

  switch (id) {
    case "scout1":
      ship.name = "Scout";
      ship.hp = buildBoundedNumber(15, 0, 15);
      ship.turnEnergy = buildBoundedNumber(5, 0, 5);
      ship.systems = [
        ...standardSystems,
        makeShipSystem("laser1", 1),
        makeShipSystem("torpedo1", 1),
      ];
      ship.items = [shipItems.potion, shipItems.torpedo];
      break;
    case "kestrel1":
      ship.name = "Kestrel";
      ship.hp = buildBoundedNumber(15, 0, 15);
      ship.turnEnergy = buildBoundedNumber(5, 0, 5);
      ship.systems = [...standardSystems, makeShipSystem("laser1", 1)];
      ship.items = [shipItems.potion, shipItems.torpedo];
      break;
    case "slug_1":
      ship.name = "Slug";
      ship.hp = buildBoundedNumber(5, 0, 5);
      ship.turnEnergy = buildBoundedNumber(4, 0, 4);
      ship.systems = [
        makeShipSystem("shields", 1),
        makeShipSystem("engines", 1),
        makeShipSystem("targeting", 1),
        makeShipSystem("power", 1),
        makeShipSystem("repair", 1),
        makeShipSystem("sensors", 1),
        makeShipSystem("laser1", 1),
        makeShipSystem("torpedo1", 1),
      ];
      break;
  }

  return ship;
}
