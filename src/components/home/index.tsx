import HomeCtaCard from './home-cta-card';
import PaymentLottie from '../common/lottie/payment.json';
import PLayLottie from '../common/lottie/play.json';

import './styles.css';

const HomeComponent = () => {
    return <div className='container'>
        <div className='left-container'>Left Side Bar</div>
        <div className='main-container'>
            <div className='home-cta__container'>
                <HomeCtaCard lottieJson={PaymentLottie} title='Deposit' />
                <HomeCtaCard lottieJson={PLayLottie} title='Play' />
            </div>
            <div className='home-text'>
                <h3>Hi, <span>Adeola</span></h3>
                <h2>Play Our Featured Games</h2>
            </div>
        </div>
        <div className='right-container'>Right Side Bar</div>
    </div>
}

export default HomeComponent;