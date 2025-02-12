"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import FeaturedGamesCard from './card';
import './styles.css';
import { FeatureGame } from "@/src/constants/game";

const FeaturedGamesCardContainer = () => {
    const [sliderRef] = useKeenSlider({
        slides: {
            perView: 1.2, // Show part of the next slide
            spacing: 10,  // Adjust spacing between slides
        },
    });
    return (
        <div ref={sliderRef} className="keen-slider">
            {FeatureGame.map((data) =>  <FeaturedGamesCard key={data?.title} {...data} />)}
        </div>
    )
}

export default FeaturedGamesCardContainer;