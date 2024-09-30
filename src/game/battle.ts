import { type Enemy, type EnemyTemplate } from "./enemies";

export type Battle = {
  enemy: Enemy;
};

export function newBattle(enemyTemplate: EnemyTemplate): Battle {
  return {
    enemy: {
      template: enemyTemplate,
      health: enemyTemplate.maxHealth,
      block: enemyTemplate.block,
      attack: enemyTemplate.attack,
      dodge: enemyTemplate.dodge,
    },
  };
}
