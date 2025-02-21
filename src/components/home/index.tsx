import HomeCtaCard from './home-cta-card';
import LeaderBoardCardContainer from '../common/leaderboardcard';
import Greeting from '../common/greeting';
import FeaturedGamesCardContainer from './featured-games-card';
import UpcomingTournamentCardContainer from './upcoming-tournament-card';
import NavWrapper from '../common/wrapper/nav-wrapper';
import HeadingSectionWrapper from '../common/wrapper/heading-section-wrapper';
import PaymentLottie from '../common/lottie/payment.json';
import PLayLottie from '../common/lottie/play.json';

import './styles.css';


const HomeComponent = () => {
    return <NavWrapper>
        <div className='container'>
            <div className='left-container'>Left Side Bar</div>
            <div className='main-container'>
                <Greeting />
                <div className='home-cta__container'>
                    <HomeCtaCard lottieJson={PaymentLottie} title='Deposit' />
                    <HomeCtaCard lottieJson={PLayLottie} title='Play' />
                </div>
                <HeadingSectionWrapper title='Play Our Featured Games'>
                    <FeaturedGamesCardContainer />
                </HeadingSectionWrapper>
                <HeadingSectionWrapper title='Upcoming Tournaments'>
                    <UpcomingTournamentCardContainer />
                </HeadingSectionWrapper>
                <HeadingSectionWrapper title='Leaderboard'>
                    <LeaderBoardCardContainer />
                </HeadingSectionWrapper>
            </div>
            <div className='right-container'>Right Side Bar</div>
        </div>
    </NavWrapper>
}

export default HomeComponent;