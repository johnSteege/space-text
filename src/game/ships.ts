export type ShipTemplate = {
  name: string;
  maxHealth: number;
  block: number;
  attack: number;
  dodge: number;
  startingWeapons: Weapon[];
};

export type Weapon = {
  name: string;
  damage: number;
};

export const ships: Record<string, ShipTemplate> = {
  ship_1: {
    name: "Scout",
    maxHealth: 15,
    block: 1,
    attack: 1,
    dodge: 1,
    startingWeapons: [
      {
        name: "Laser",
        damage: 1,
      },
    ],
  },
};
