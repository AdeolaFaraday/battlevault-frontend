"use client";
import { useKeenSlider } from "keen-slider/react";
import UpcomingTournamentCard from "./card";

import "keen-slider/keen-slider.min.css";
import './styles.css';
import { UpcomingTournaments } from "@/src/constants/game";

const UpcomingTournamentCardContainer = () => {
    const [sliderRef] = useKeenSlider({
        slides: {
            perView: 1.05, // Show part of the next slide
            spacing: 10,  // Adjust spacing between slides
        },
    });
    return (
        <div ref={sliderRef} className="keen-slider">
            {UpcomingTournaments.map((data) => <UpcomingTournamentCard key={data?.title} {...data} />)}
        </div>
    )
}

export default UpcomingTournamentCardContainer;