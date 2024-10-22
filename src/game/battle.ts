import { useGameStateStore } from "@/stores/gameState";
import type { ShipInstance, ShipTemplate } from "./ships";
import { buildShip, nullShip } from "./ships";
import { randomIntLinear } from "./util";

type Choice = {
  text: string;
  action: () => void;
};

export type Battle = {
  enemy: ShipInstance;
  phase:
    | "battleIntro"
    | "playerTurn"
    | "playerResult"
    | "enemyTurn"
    | "enemyResult"
    | "battleSummary";
  phaseText: string[];
  choices: Choice[];
};

export const nullBattle: Battle = {
  enemy: nullShip,
  phase: "battleIntro",
  phaseText: ["ErRoR - NULL BATTLE"],
  choices: [],
};

export function getPhaseAttacker(): ShipInstance {
  const gameState = useGameStateStore();
  if (gameState.battle.phase in ["enemyTurn", "enemyResult"]) {
    return gameState.battle.enemy;
  } else return gameState.playerShip;
}

export function getPhaseDefender(): ShipInstance {
  const gameState = useGameStateStore();
  if (gameState.battle.phase in ["enemyTurn", "enemyResult"]) {
    return gameState.playerShip;
  } else return gameState.battle.enemy;
}

function nextPhase(): void {
  const gameState = useGameStateStore();

  if (checkIsBattleOver()) {
    return;
  }

  if (gameState.battle.phase === "battleIntro") {
    playerTurn();
  } else if (gameState.battle.phase === "playerTurn") {
    playerResult();
  } else if (gameState.battle.phase === "playerResult") {
    enemyTurn();
  } else if (gameState.battle.phase === "enemyTurn") {
    enemyResult();
  } else if (gameState.battle.phase === "enemyResult") {
    playerTurn();
  } else {
    gameState.battle.phase = "battleSummary";
    gameState.battle.phaseText = ["ErRoR - Invalid battle phase"];
  }
}

function checkIsBattleOver(): boolean {
  const gameState = useGameStateStore();

  if (gameState.playerShip.hp <= 0) {
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

  if (gameState.battle.enemy.hp <= 0) {
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

export function startBattle(enemyTemplate: ShipTemplate): void {
  const gameState = useGameStateStore();
  const enemy: ShipInstance = buildShip(enemyTemplate);

  gameState.battle = {
    enemy,
    phase: "battleIntro",
    phaseText: [`A ${enemy.template.templateName} has appeared!`],
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

function playerTurn(): void {
  const gameState = useGameStateStore();

  gameState.battle.phase = "playerTurn";
  gameState.battle.phaseText = ["Your Turn"];
  gameState.battle.choices = [];
  for (const system of gameState.playerShip.systems) {
    gameState.battle.choices.push({
      text: system.template.name,
      action: () => {
        system.template.action();
        nextPhase();
      },
    });
  }
}

function playerResult(): void {
  const gameState = useGameStateStore();

  gameState.battle.phase = "playerResult";
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

function enemyTurn(): void {
  const gameState = useGameStateStore();

  gameState.battle.phase = "enemyTurn";
  gameState.battle.phaseText = ["Enemy is attacking"];
  gameState.battle.choices = [
    {
      text: "Shields Up",
      action: () => {
        gameState.battle.enemy.systems[0].template.action();
        nextPhase();
      },
    },
  ];
}

function enemyResult(): void {
  const gameState = useGameStateStore();

  gameState.battle.phase = "enemyResult";
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

export function fireWeapon(
  accuracyModifier: number,
  minDamage: number,
  maxDamage: number
): void {
  const gameState = useGameStateStore();

  // const evasion = Math.max(0, getPhaseDefender().evasion - accuracyModifier);
  const evasion = Math.max(0, 90 - accuracyModifier);
  const hitChance = 100 - 5 * evasion;
  const evadeRoll = randomIntLinear(0, 100);

  console.log(`evadeRoll: ${evadeRoll}, hitChance: ${hitChance}`);

  if (evadeRoll > hitChance) {
    // miss
    gameState.battle.phaseText = [
      `${getPhaseDefender().name} evaded the attack.`,
    ];
    return;
  }

  const damage = randomIntLinear(minDamage, maxDamage);

  getPhaseDefender().hp -= damage;
  gameState.battle.phaseText = [
    `${getPhaseDefender().name} took ${damage} damage.`,
  ];
}

// import { useGameStateStore } from "@/stores/gameState";
// import type { ShipInstance, ShipTemplate } from "./ships";
// import { buildShip, nullShip } from "./ships";
// import { randomIntLinear } from "./util";

// type Choice = {
//   text: string;
//   action: () => void;
// };

// export type Battle = {
//   enemy: ShipInstance;
//   phase:
//     | "battleStart"
//     | "playerAttack"
//     | "attackResult"
//     | "playerDefend"
//     | "defendResult"
//     | "battleSummary";
//   phaseText: string[];
//   phaseAttacker: ShipInstance;
//   phaseDefender: ShipInstance;
//   choices: Choice[];
// };

// export const nullBattle: Battle = {
//   enemy: nullShip,
//   phase: "battleStart",
//   phaseText: ["ErRoR - NULL BATTLE"],
//   phaseAttacker: nullShip,
//   phaseDefender: nullShip,
//   choices: [],
// };

// export function startBattle(enemyTemplate: ShipTemplate): void {
//   const gameState = useGameStateStore();
//   const enemy: ShipInstance = buildShip(enemyTemplate);

//   gameState.battle = {
//     enemy,
//     phase: "battleStart",
//     phaseText: [`A ${enemy.template.templateName} has appeared!`],
//     phaseAttacker: nullShip,
//     phaseDefender: nullShip,
//     choices: [
//       {
//         text: "Start Battle",
//         action: () => {
//           nextPhase();
//         },
//       },
//     ],
//   };
//   gameState.isBattle = true;
// }

// function nextPhase(): void {
//   const gameState = useGameStateStore();

//   if (checkIsBattleOver()) {
//     return;
//   }

//   if (gameState.battle.phase === "battleStart") {
//     playerAttack();
//   } else if (gameState.battle.phase === "playerAttack") {
//     attackResult();
//   } else if (gameState.battle.phase === "attackResult") {
//     playerDefend();
//   } else if (gameState.battle.phase === "playerDefend") {
//     defendResult();
//   } else if (gameState.battle.phase === "defendResult") {
//     playerAttack();
//   } else {
//     gameState.battle.phase = "battleSummary";
//     gameState.battle.phaseText = ["ErRoR - Invalid battle phase"];
//   }
// }

// function checkIsBattleOver(): boolean {
//   const gameState = useGameStateStore();

//   if (gameState.playerShip.hp <= 0) {
//     gameState.battle.phase = "battleSummary";
//     gameState.battle.phaseText.push("You have been defeated!");
//     gameState.battle.choices = [
//       {
//         text: "Game Over",
//         action: () => {
//           gameState.isBattle = false;
//           gameState.battle = nullBattle;
//           gameState.sceneId = "gameOver";
//         },
//       },
//     ];

//     return true;
//   }

//   if (gameState.battle.enemy.hp <= 0) {
//     gameState.battle.phase = "battleSummary";
//     gameState.battle.phaseText.push("The enemy has been defeated!");
//     gameState.battle.choices = [
//       {
//         text: "Continue",
//         action: () => {
//           gameState.isBattle = false;
//           gameState.battle = nullBattle;
//           gameState.sceneId = "dialogue1";
//         },
//       },
//     ];

//     return true;
//   }

//   return false;
// }

// function playerAttack(): void {
//   const gameState = useGameStateStore();

//   gameState.battle.phase = "playerAttack";
//   gameState.battle.phaseText = ["Your Turn"];
//   gameState.battle.phaseAttacker = gameState.playerShip;
//   gameState.battle.phaseDefender = gameState.battle.enemy;
//   gameState.battle.choices = [];
//   for (const weapon of gameState.playerShip.weapons) {
//     gameState.battle.choices.push({
//       text: weapon.name,
//       action: () => {
//         weapon.action();
//         nextPhase();
//       },
//     });
//   }
// }

// function attackResult(): void {
//   const gameState = useGameStateStore();

//   gameState.battle.phase = "attackResult";
//   // gameState.battle.phaseText = "You did some damage";
//   gameState.battle.choices = [
//     {
//       text: "Continue",
//       action: () => {
//         nextPhase();
//       },
//     },
//   ];
// }

// function playerDefend(): void {
//   const gameState = useGameStateStore();

//   gameState.battle.phase = "playerDefend";
//   gameState.battle.phaseText = ["Enemy is attacking"];
//   gameState.battle.phaseAttacker = gameState.battle.enemy;
//   gameState.battle.phaseDefender = gameState.playerShip;
//   gameState.battle.choices = [
//     {
//       text: "Shields Up",
//       action: () => {
//         gameState.battle.enemy.weapons[0].action();
//         nextPhase();
//       },
//     },
//   ];
// }

// function defendResult(): void {
//   const gameState = useGameStateStore();

//   gameState.battle.phase = "defendResult";
//   // gameState.battle.phaseText = "You blocked some damage";
//   gameState.battle.choices = [
//     {
//       text: "Continue",
//       action: () => {
//         nextPhase();
//       },
//     },
//   ];
// }

// export function fireWeapon(
//   accuracyModifier: number,
//   minDamage: number,
//   maxDamage: number
// ): void {
//   const gameState = useGameStateStore();

//   const evasion = Math.max(
//     0,
//     gameState.battle.phaseDefender.evasion - accuracyModifier
//   );
//   const hitChance = 100 - 5 * evasion;
//   const evadeRoll = randomIntLinear(0, 100);

//   console.log(`evadeRoll: ${evadeRoll}, hitChance: ${hitChance}`);

//   if (evadeRoll > hitChance) {
//     // miss
//     gameState.battle.phaseText = [
//       `${gameState.battle.phaseDefender.name} evaded the attack.`,
//     ];
//     return;
//   }

//   const damage = randomIntLinear(minDamage, maxDamage);

//   gameState.battle.phaseDefender.hp -= damage;
//   gameState.battle.phaseText = [
//     `${gameState.battle.phaseDefender.name} took ${damage} damage.`,
//   ];
// }
