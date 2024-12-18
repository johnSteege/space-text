import { useGameStateStore } from "@/stores/gameState";
import { useBattleStore } from "@/stores/battle";

export type Choice = {
  text: string;
  action?: () => void;
  nextSceneId: string;
};

export type Scene = {
  id: string;
  type: string;
  text: string;
  choices: Choice[];
};

const scenes: Scene[] = [
  {
    id: "intro",
    type: "intro",
    text: "Welcome to Space Text",
    choices: [{ text: "Start", nextSceneId: "dialogue1" }],
  },
  {
    id: "gameOver",
    type: "gameOver",
    text: "Game Over",
    choices: [], // StoryView needs to handle this.
  },
  {
    id: "battle",
    type: "battle",
    text: "Battle",
    choices: [],
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
          useBattleStore().startBattle("slug_a");
        },
        nextSceneId: "battle",
      },
    ],
  },
];

const nullScene: Scene = {
  id: "none",
  type: "none",
  text: "ERROR - NULL SCENE",
  choices: [],
};

export function getScene(id: string): Scene {
  return scenes.find((s) => s.id === id) || nullScene;
}
