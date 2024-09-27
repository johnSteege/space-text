const scenes: Scene[] = [
  {
    id: "intro",
    type: "intro",
    text: "Welcome to Space Text",
    choices: [],
  },
  {
    id: "dialogue",
    type: "dialogue",
    text: "testing",
    choices: [],
  },
];

export type Scene = {
  id: string;
  type: string;
  text: string;
  choices: any[];
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
