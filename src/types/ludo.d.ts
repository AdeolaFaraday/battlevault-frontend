type Token = {
    sn: number
    color: string
    active?: boolean
    position?: number
    isSafePath?: boolean
    isFinished?: boolean
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
    avatarUrl?: string;
    color: "red" | "blue" | "green" | "yellow";
    tokens: string[];
    img?: string; // Legacy support if needed
    rank?: number; // For UI
    capturedCount?: number;
    finishedCount?: number;
};

type LudoGameState = {
    id?: string;
    players: LudoPlayer[];
    currentTurn: string; // Player ID
    diceValue: number[];
    isRolling: boolean;
    status: "waiting" | "playingDice" | "playingToken" | "finished";
    winner?: string;
    tokens: {
        blue: Token[];
        yellow: Token[];
        green: Token[];
        red: Token[];
    };
    usedDiceValues: number[];
    activeDiceConfig: number[] | null;
    lastMoverId?: string;
    lastUpdated?: any;
    createdAt?: string;
    updatedAt?: string;
};