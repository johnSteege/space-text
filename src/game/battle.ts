import { useGameStateStore } from "@/stores/gameState";
import type { ShipInstance, ShipTemplate } from "./ships";
import { buildShip, nullShip } from "./ships";

type Choice = {
  text: string;
  action: () => void;
};

export type Battle = {
  enemy: ShipInstance;
  phase:
    | "battleStart"
    | "playerAttack"
    | "attackResult"
    | "playerDefend"
    | "defendResult"
    | "battleSummary";
  phaseText: string[];
  phaseAttacker: ShipInstance;
  phaseDefender: ShipInstance;
  choices: Choice[];
};

export const nullBattle: Battle = {
  enemy: nullShip,
  phase: "battleStart",
  phaseText: ["ErRoR - NULL BATTLE"],
  phaseAttacker: nullShip,
  phaseDefender: nullShip,
  choices: [],
};

export function startBattle(enemyTemplate: ShipTemplate): void {
  const gameState = useGameStateStore();
  const enemy: ShipInstance = buildShip(enemyTemplate);

  gameState.battle = {
    enemy,
    phase: "battleStart",
    phaseText: [`A ${enemy.template.templateName} has appeared!`],
    phaseAttacker: nullShip,
    phaseDefender: nullShip,
    choices: [
      {
        text: "Start Battle",
        action: () => {
          nextPhase();
        },
      },
    ],
  };
  gameState.isBattle = true;
}

function nextPhase(): void {
  const gameState = useGameStateStore();

  if (checkIsBattleOver()) {
    return;
  }

  if (gameState.battle.phase === "battleStart") {
    playerAttack();
  } else if (gameState.battle.phase === "playerAttack") {
    attackResult();
  } else if (gameState.battle.phase === "attackResult") {
    playerDefend();
  } else if (gameState.battle.phase === "playerDefend") {
    defendResult();
  } else if (gameState.battle.phase === "defendResult") {
    playerAttack();
  } else {
    gameState.battle.phase = "battleSummary";
    gameState.battle.phaseText = ["ErRoR - Invalid battle phase"];
  }
}

function checkIsBattleOver(): boolean {
  const gameState = useGameStateStore();

  if (gameState.playerShip.health <= 0) {
    gameState.battle.phase = "battleSummary";
    gameState.battle.phaseText.push("You have been defeated!");
    gameState.battle.choices = [
      {
        text: "Game Over",
        action: () => {
          gameState.isBattle = false;
          gameState.battle = nullBattle;
          gameState.sceneId = "gameOver";
        },
      },
    ];

    return true;
  }

  if (gameState.battle.enemy.health <= 0) {
    gameState.battle.phase = "battleSummary";
    gameState.battle.phaseText.push("The enemy has been defeated!");
    gameState.battle.choices = [
      {
        text: "Continue",
        action: () => {
          gameState.isBattle = false;
          gameState.battle = nullBattle;
          gameState.sceneId = "dialogue1";
        },
      },
    ];

    return true;
  }

  return false;
}

function playerAttack(): void {
  const gameState = useGameStateStore();

  gameState.battle.phase = "playerAttack";
  gameState.battle.phaseText = ["Your Turn"];
  gameState.battle.phaseAttacker = gameState.playerShip;
  gameState.battle.phaseDefender = gameState.battle.enemy;
  gameState.battle.choices = [];
  for (const weapon of gameState.playerShip.weapons) {
    gameState.battle.choices.push({
      text: weapon.name,
      action: () => {
        weapon.action();
        nextPhase();
      },
    });
  }
}

function attackResult(): void {
  const gameState = useGameStateStore();

  gameState.battle.phase = "attackResult";
  // gameState.battle.phaseText = "You did some damage";
  gameState.battle.choices = [
    {
      text: "Continue",
      action: () => {
        nextPhase();
      },
    },
  ];
}

function playerDefend(): void {
  const gameState = useGameStateStore();

  gameState.battle.phase = "playerDefend";
  gameState.battle.phaseText = ["Enemy is attacking"];
  gameState.battle.phaseAttacker = gameState.battle.enemy;
  gameState.battle.phaseDefender = gameState.playerShip;
  gameState.battle.choices = [
    {
      text: "Shields Up",
      action: () => {
        gameState.battle.enemy.weapons[0].action();
        nextPhase();
      },
    },
  ];
}

function defendResult(): void {
  const gameState = useGameStateStore();

  gameState.battle.phase = "defendResult";
  // gameState.battle.phaseText = "You blocked some damage";
  gameState.battle.choices = [
    {
      text: "Continue",
      action: () => {
        nextPhase();
      },
    },
  ];
}
