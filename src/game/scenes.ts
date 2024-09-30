const scenes: Scene[] = [
  {
    id: "intro",
    type: "intro",
    text: "Welcome to Space Text",
    choices: [{ text: "Start", action: () => {}, nextSceneId: "dialogue1" }],
  },
  {
    id: "dialogue1",
    type: "dialogue",
    text: "dialogue1",
    choices: [
      {
        text: "Next",
        action: () => {},
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
        action: () => {},
        nextSceneId: "dialogue1",
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
