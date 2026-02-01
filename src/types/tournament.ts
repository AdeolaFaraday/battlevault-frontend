export interface BracketPlayer {
    id: string;
    name: string;
    color: string;
    tokens: string[];
}

export interface BracketGame {
    _id: string;
    name: string;
    status: string;
    players: BracketPlayer[];
    winner?: string;
}

export interface BracketStage {
    _id: string;
    name: string;
    index: number;
    games: BracketGame[];
}

export interface TournamentDetails {
    _id: string;
    title: string;
}

export interface TournamentBracket {
    tournament: TournamentDetails;
    stages: BracketStage[];
}

export interface GetTournamentBracketResponse {
    getTournamentBracket: {
        statusCode: number;
        success: boolean;
        message: string;
        data: TournamentBracket;
    };
}

export interface TournamentRegistration {
    isRegistered: boolean;
}

export interface IsUserRegisteredResponse {
    isUserRegistered: {
        statusCode: number;
        success: boolean;
        message: string;
        data: TournamentRegistration;
    };
}
