"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import FeaturedGamesCard from './card';
import './styles.css';

const FeaturedGamesCardContainer = () => {
    const [sliderRef] = useKeenSlider({
        slides: {
            perView: 1.2, // Show part of the next slide
            spacing: 10,  // Adjust spacing between slides
        },
    });
    return (
        <div ref={sliderRef} className="keen-slider">
            <FeaturedGamesCard />
            <FeaturedGamesCard />
        </div>
    )
}

export default FeaturedGamesCardContainer;