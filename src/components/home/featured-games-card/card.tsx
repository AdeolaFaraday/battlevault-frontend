"use client";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

import Button from '../../common/button';
import './styles.css';
import { FeatureGameType } from "@/src/constants/game";


const FeaturedGamesCard = ({
    title,
    subTitle,
    buttonBgColor,
    backgroundColor,
    animation
}: FeatureGameType) => {
    return (
        <div className="feature-games__card keen-slider__slide" style={{ background: backgroundColor }}>
            <div className='feature-games__cta'>
                <div className='feature-games__text'>
                    <h2>{title}</h2>
                    <h5>{subTitle}</h5>
                </div>
                <Button title="Let's Play" customClassName="feature-games__play" style={{ background: buttonBgColor }} />
            </div>
            <div className="feature-games__lottie">
                <Lottie
                    loop
                    animationData={animation}
                    play
                    style={{ width: "100%", height: "100%" }}
                />
            </div>
        </div>
    )
}

export default FeaturedGamesCard;