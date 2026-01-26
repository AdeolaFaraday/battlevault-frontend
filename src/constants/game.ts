import LudoLottie from "../components/common/lottie/ludo.json";
import ChessLottie from "../components/common/lottie/chess.json";

export type FeatureGameType = {
    title: string;
    subTitle: string;
    backgroundColor: string;
    buttonBgColor: string;
    animation: object;
    link: string;
};

export type LeaderboardCardType = {
    profileImage: string;
    subTitle: string;
    name: string;
    points: number;
    ringColor: string;
};

export type TournamentUser = {
    _id: string;
    userName: string;
};

export type Tournament = {
    _id: string;
    date?: string;
    time?: string;
    title: string;
    description?: string;
    gameType?: string;
    entryFee: number;
    entryFeeCurrency?: string;
    prize: string | number;
    status: string;
    frequency?: string;
    isPrivate?: boolean;
    maxUsers: number;
    startDate: string;
    endDate?: string;
    registeredUsers?: TournamentUser[];
};

export const FeatureGame: FeatureGameType[] = [
    {
        title: "Ludo Royale",
        subTitle: "Roll and rule.",
        backgroundColor: "#FF5733",
        buttonBgColor: "#C70039",
        animation: LudoLottie,
        link: "/ludo"
    },
    {
        title: "Chess Master",
        subTitle: "Think and win.",
        backgroundColor: "#2C3E50",
        buttonBgColor: "#1A5276",
        animation: ChessLottie,
        link: "/chess"
    }
];

export const LeaderboardData: LeaderboardCardType[] = [
    {
        profileImage: "https://randomuser.me/api/portraits/men/10.jpg",
        subTitle: "9 Streak",
        name: "John Doe",
        points: 1500,
        ringColor: "#3b82f6",
    },
    {
        profileImage: "https://randomuser.me/api/portraits/women/15.jpg",
        subTitle: "8 Streak",
        name: "Jane Smith",
        points: 1800,
        ringColor: "#FACC15",
    },
    {
        profileImage: "https://randomuser.me/api/portraits/men/22.jpg",
        subTitle: "7 Streak",
        name: "Alex Johnson",
        points: 2000,
        ringColor: "#10b981",
    },
    {
        profileImage: "https://randomuser.me/api/portraits/women/30.jpg",
        subTitle: "10 Streak",
        name: "Emily Davis",
        points: 2200,
        ringColor: "#8b5cf6",
    },
    {
        profileImage: "https://randomuser.me/api/portraits/men/33.jpg",
        subTitle: "6 Streak",
        name: "Michael Brown",
        points: 1400,
        ringColor: "#f97316",
    },
];


export const UpcomingTournaments: Tournament[] = [
    {
        _id: "1",
        title: "Ludo Championship",
        gameType: "Ludo",
        startDate: "2025-02-20T18:00:00Z",
        maxUsers: 32,
        entryFee: 500,
        prize: 50000,
        status: "Upcoming"
    },
    {
        _id: "2",
        title: "Chess Grand Battle",
        gameType: "Chess",
        startDate: "2025-02-25T19:00:00Z",
        maxUsers: 16,
        entryFee: 1000,
        prize: 100000,
        status: "Upcoming"
    },
];
