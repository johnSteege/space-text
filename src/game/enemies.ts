export type Enemy = {
  template: EnemyTemplate;
  health: number;
  block: number;
  attack: number;
  dodge: number;
};

export type EnemyTemplate = {
  name: string;
  maxHealth: number;
  block: number;
  attack: number;
  dodge: number;
};

export const enemies: Record<string, EnemyTemplate> = {
  slug_1: {
    name: "Slug Cruiser",
    maxHealth: 5,
    block: 1,
    attack: 1,
    dodge: 1,
  },
};
