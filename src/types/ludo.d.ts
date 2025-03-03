type Token = {
    sn: number
    color: string
    active?: boolean
    position?: number
}

type LudoPlayer = {
    id: string;
    name: string;
    color: "red" | "blue" | "green" | "yellow";
    tokens: {
        tokenName: string,
        token: Token[]
    };
};

type LudoGameState = {
    players: LudoPlayer[];
    currentTurn: string; // Player ID
    diceValue: number;
    isRolling: boolean;
    status: "waiting" | "playing" | "finished";
};