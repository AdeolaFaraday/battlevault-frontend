type Token = {
    sn: number
    color: string
    active?: boolean
    position?: number
    isSafePath?: boolean
}

type DiceValue = {
    sides: string;
    dieType: string;
    groupId: number;
    rollId: number;
    theme: string;
    themeColor: string;
    value: number;
}

type LudoPlayer = {
    id: string;
    name: string;
    color: "red" | "blue" | "green" | "yellow";
    tokens: string[]
};

type LudoGameState = {
    players: LudoPlayer[];
    currentTurn: string; // Player ID
    diceValue: number[];
    isRolling: boolean;
    status: "waiting" | "playingDice" | "playingToken" | "finished";
    winner?: string;
};