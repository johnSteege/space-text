export type Weapon = {
  name: string;
  damage: number;
};

export type ShipTemplate = {
  templateName: string;
  maxHealth: number;
  block: number;
  dodge: number;
  startingWeapons: Weapon[];
};

export type ShipInstance = {
  template: ShipTemplate;
  name: string;
  health: number;
  block: number;
  dodge: number;
  weapons: Weapon[];
};

export function buildShip(template: ShipTemplate): ShipInstance {
  return {
    template,
    name: template.templateName,
    health: template.maxHealth,
    block: template.block,
    dodge: template.dodge,
    weapons: template.startingWeapons,
  };
}

export const playerShipTemplates: Record<string, ShipTemplate> = {
  scout1: {
    templateName: "Scout",
    maxHealth: 15,
    block: 1,
    dodge: 1,
    startingWeapons: [
      {
        name: "Laser 1",
        damage: 1,
      },
      {
        name: "Missile 1",
        damage: 2,
      },
    ],
  },
};

export const nullShip = buildShip({
  templateName: "ErRoR",
  maxHealth: 1,
  block: 0,
  dodge: 0,
  startingWeapons: [],
} as ShipTemplate);
