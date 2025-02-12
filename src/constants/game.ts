import LudoLottie from "../components/common/lottie/ludo.json";
import ChessLottie from "../components/common/lottie/chess.json";

export type FeatureGameType = {
    title: string;
    subTitle: string;
    backgroundColor: string;
    buttonBgColor: string;
    animation: any;
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