import { LeaderboardData } from '@/src/constants/game';
import LeaderboardCard from './card';

const LeaderBoardCardContainer = () => {
    return (
        <div>
            {LeaderboardData.map((data) => <LeaderboardCard key={data?.name} {...data} />)}
        </div>
    )
}

export default LeaderBoardCardContainer;