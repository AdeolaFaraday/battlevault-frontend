"use client";
import { Clock, Trophy, Users } from "lucide-react";
import Button from '../../common/button';
import { Tournament } from "@/src/constants/game";

import './styles.css';


const UpcomingTournamentCard = ({
    date,
    // entryFee,
    maxUsers,
    prize,
    time,
    title,
}: Tournament) => {

    return (
        <div className="tournament-card keen-slider__slide">
            {/* Tournament Header */}
            <div className="tournament-header">
                <h3 className="tournament-title">{title}</h3>
                {/* <span className="tournament-badge">Upcoming</span> */}
            </div>

            {/* Tournament Details */}
            <div className="tournament-details">
                <div className="tournament-info">
                    <span className="icon-container clock-icon">
                        <Clock size={16} />
                    </span>
                    <span>{date} | {time}</span>
                </div>
                <div className="tournament-info">
                    <span className="icon-container users-icon">
                        <Users size={16} />
                    </span>
                    <span>{maxUsers} Users Max</span>
                </div>
                <div className="tournament-info">
                    <span className="icon-container trophy-icon">
                        <Trophy size={16} />
                    </span>
                    <span>Prize: ₦{prize.toLocaleString()}</span>
                </div>
            </div>

            {/* CTA Section */}
            <div className="tournament-footer">
                <span className="entry-fee">No Entry Fee</span>
                {/* <button className="join-button">Join Now</button> */}
                <Button title="Join Now" customClassName="join-button" />
            </div>
        </div>
    )
}

export default UpcomingTournamentCard;