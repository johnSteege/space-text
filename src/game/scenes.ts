import { useGameStateStore } from "@/stores/gameState";
import { newBattle } from "./battle";
import { enemyTemplates } from "./enemies";

const scenes: Scene[] = [
  {
    id: "intro",
    type: "intro",
    text: "Welcome to Space Text",
    choices: [{ text: "Start", action: () => {}, nextSceneId: "dialogue1" }],
  },
  {
    id: "battle",
    type: "battle",
    text: "Battle",
    choices: [{text: "Continue", action: () => {}, nextSceneId: "dialogue1"}],
  },
  {
    id: "dialogue1",
    type: "dialogue",
    text: "dialogue1",
    choices: [
      {
        text: "Next",
        action: () => {
          useGameStateStore().playerMoney += 1;
        },
        nextSceneId: "dialogue2",
      },
    ],
  },
  {
    id: "dialogue2",
    type: "dialogue",
    text: "dialogue2",
    choices: [
      {
        text: "Next",
        action: () => {
          useGameStateStore().playerMoney += 3;
        },
        nextSceneId: "dialogue1",
      },
      {
        text: "Start battle",
        action: () => {
          useGameStateStore().battle = newBattle(enemyTemplates.slug_1);
        },
        nextSceneId: "battle",
      },
    ],
  },
];

export type Scene = {
  id: string;
  type: string;
  text: string;
  choices: Choice[];
};

export type Choice = {
  text: string;
  action: () => void;
  nextSceneId: string;
};

const nullScene: Scene = {
  id: "none",
  type: "none",
  text: "ERROR - NULL SCENE",
  choices: [],
};

export function getScene(id: string): Scene {
  return scenes.find((s) => s.id === id) || nullScene;
}
