"use client";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

import './styles.css';

const HomeCtaCard = ({ lottieJson, title }: { lottieJson: Record<string, unknown>, title: string }) => {
    return (
        <div className="home-cta">
            <Lottie
                loop
                animationData={lottieJson}
                play
                style={{ width: "100%", height: "100%" }}
            />
            <span className="home-cta_text">
                {title}
            </span>
        </div>
    )
}

export default HomeCtaCard;