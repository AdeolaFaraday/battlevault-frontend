import LudoLottie from "../components/common/lottie/ludo.json";
import ChessLottie from "../components/common/lottie/chess.json";

export type FeatureGameType = {
    title: string;
    subTitle: string;
    backgroundColor: string;
    buttonBgColor: string;
    animation: any;
};

export type Tournament = {
    id: number;
    title: string;
    game: "Ludo" | "Chess";
    date: string;
    time: string;
    maxPlayers: number;
    entryFee: number;
    prize: number;
    // status: "Upcoming" | "Ongoing" | "Completed";
    // color: string;
};

export const FeatureGame: FeatureGameType[] = [
    {
        title: "Ludo Royale",
        subTitle: "Roll and rule.",
        backgroundColor: "#FF5733",
        buttonBgColor: "#C70039",
        animation: LudoLottie,
    },
    {
        title: "Chess Master",
        subTitle: "Think and win.",
        backgroundColor: "#2C3E50",
        buttonBgColor: "#1A5276",
        animation: ChessLottie
    }
];

export const UpcomingTournaments: Tournament[] = [
    {
        id: 1,
        title: "Ludo Championship",
        game: "Ludo",
        date: "Feb 20, 2025",
        time: "6:00 PM GMT",
        maxPlayers: 32,
        entryFee: 500,
        prize: 50000,
    },
    {
        id: 2,
        title: "Chess Grand Battle",
        game: "Chess",
        date: "Feb 25, 2025",
        time: "7:00 PM GMT",
        maxPlayers: 16,
        entryFee: 1000,
        prize: 100000,
    },
];
