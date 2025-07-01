import LudoLottie from "../components/common/lottie/ludo.json";
import ChessLottie from "../components/common/lottie/chess.json";

export type FeatureGameType = {
    title: string;
    subTitle: string;
    backgroundColor: string;
    buttonBgColor: string;
    animation: any;
    link: string;
};

export type LeaderboardCardType = {
    profileImage: string;
    subTitle: string;
    name: string;
    points: number;
    ringColor: string;
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
