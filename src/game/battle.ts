import { useGameStateStore } from "@/stores/gameState";
import type { ShipInstance, ShipTemplate } from "./ships";
import { buildShip, defaultPlayerShip } from "./ships";

type Choice = {
  text: string;
  action: () => void;
};

export type Battle = {
  enemy: ShipInstance;
  phase: "intro" | "player" | "enemy" | "summary";
  phaseText: string;
  choices: Choice[];
};

export function buildBattle(enemyTemplate: ShipTemplate): Battle {
  const enemy: ShipInstance = buildShip(enemyTemplate);
  return {
    enemy,
    phase: "intro",
    phaseText: "A " + enemy.template.templateName + " has appeared!",
    choices: [
      {
        text: "Start Battle",
        action: () => {
          nextPhase();
        },
      },
    ],
  };
}

function getBattleState(): Battle {
  const gameState = useGameStateStore();
  if (gameState.battle === null) {
    console.error("No battle found in game state.");
    return buildBattle(defaultPlayerShip.template);
  }
  const battle: Battle = gameState.battle;
  return battle;
}

function nextPhase(): void {
  const gameState = useGameStateStore();
  const battle: Battle = getBattleState();

  if (checkIsBattleOver()) {
    return;
  }
  if (battle.phase === "intro") {
    playerTurn();
  } else if (battle.phase === "player") {
    enemyTurn();
  } else if (battle.phase === "enemy") {
    playerTurn();
  }
}

function checkIsBattleOver(): boolean {
  const gameState = useGameStateStore();
  const battle: Battle = getBattleState();

  if (battle.enemy.health <= 0) {
    battle.phase = "summary";
    battle.phaseText = "The enemy has been defeated!";
    battle.choices = [
      {
        text: "Continue",
        action: () => {
          gameState.battle = null;
          gameState.sceneId = "dialogue1";
        },
      },
    ];

    return true;
  } else if (gameState.playerShip.health <= 0) {
    battle.phase = "summary";
    battle.phaseText = "You have been defeated!";
    battle.choices = [
      {
        text: "Game Over",
        action: () => {
          gameState.battle = null;
          gameState.sceneId = "gameOver";
        },
      },
    ];

    return true;
  }

  return false;
}

function playerTurn(): void {
  const gameState = useGameStateStore();
  const battle: Battle = getBattleState();

  battle.phase = "player";
  battle.phaseText = "Your Turn";
  battle.choices = [];
  for (const weapon of gameState.playerShip.weapons) {
    battle.choices.push({
      text: weapon.name,
      action: () => {
        battle.enemy.health -= weapon.damage;
        nextPhase();
      },
    });
  }
}

function enemyTurn(): void {
  const gameState = useGameStateStore();
  const battle: Battle = getBattleState();

  gameState.playerShip.health -= battle.enemy.weapons[0].damage;

  battle.phase = "enemy";
  battle.phaseText = "Enemy Turn";
  battle.choices = [
    {
      text: "Next",
      action: () => {
        nextPhase();
      },
    },
  ];
}
