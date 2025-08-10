import { tools } from "../utils/animation-utils";

export type FloatingTool = {
    id: number;
    tool: (typeof tools)[0];
    x: number;
    y: number;
    speed: number;
    scale: number;
    rotation: number;
  }
  