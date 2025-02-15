import HomeCtaCard from './home-cta-card';
import PaymentLottie from '../common/lottie/payment.json';
import PLayLottie from '../common/lottie/play.json';
import FeaturedGamesCardContainer from './featured-games-card';
import NavBar from '../common/nav-bar';
import UpcomingTournamentCardContainer from './upcoming-tournament-card';
import HeadingSectionWrapper from '../common/heading-section-wrapper';

import './styles.css';
import LeaderBoardCardContainer from '../common/leaderboardcard';

const profilePhoto = "https://lh3.googleusercontent.com/a/ACg8ocIn_wSdYaOBH1NyPXP1BRVzJ2Ulzr-jQyia3Ev-4wzGILTDaIs=s96-c"

const HomeComponent = () => {
    return <div>
        <NavBar profilePicture={profilePhoto} walletBalance={100000} />
        <div className='container'>
            <div className='left-container'>Left Side Bar</div>
            <div className='main-container'>
                <h3>Hi, <span>Adeola</span>{" "}👋</h3>
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
    </div>
}

export default HomeComponent;