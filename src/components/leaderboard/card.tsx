import { Award } from "lucide-react";
import Image from "next/image";
import { LeaderboardCardType } from "@/src/constants/game";
import './styles.css';

const LeaderboardCard = ({ profileImage, name, subTitle, ringColor, points }: LeaderboardCardType) => {
  return (
    <div className="leaderboard-card">
      <div className="leaderboard-profile">
        <Image
          src={profileImage}
          alt={name}
          className="leaderboard-image"
          style={{ borderColor: ringColor }}
          height={100}
          width={100}
        />
        <div className="leaderboard-info">
          <span className="leaderboard-name">{name}</span>
          {subTitle && <span className="leaderboard-subtitle">{subTitle}</span>}
        </div>
      </div>

      <div className="leaderboard-points">
        <Award className="leaderboard-icon" />
        <span className="leaderboard-score">{points} pts</span>
      </div>
    </div>
  );
};

export default LeaderboardCard;
