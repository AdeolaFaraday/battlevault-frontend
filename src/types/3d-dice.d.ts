declare module '@3d-dice/dice-box' {
  interface DiceBoxOptions {
    // id: string;
    theme?: string;
    assetPath?: string;
    dimensions?: {
      w: number;
      h: number;
    };
    scale?: number;
    lightIntensity?: number;
    themeColor?: string;
    throwForce?: number;
    spinForce?: number;
  }

  export default class DiceBox {
    constructor(selector: string, options?: DiceBoxOptions);
    init(): Promise<void>;
    roll(notation: string): Promise<number[]>;
  }
} 