import FundingInfoCard from './FundingInfoCard';
import ProjectCarousel from './ProjectCarousel';
import './style/splash-page.css';

const SplashPage = () => {
    return (
        <div className="splash-page-container">
            <div className='splash-page-header-container'>
                <p className='splash-page-header'>
                    Creative work shows us what's possible.
                </p>
                <p className='splash-page-header'>
                    Help fund it here.
                </p>
            </div>
            <FundingInfoCard />
            <ProjectCarousel />
        </div>
    )
};

export default SplashPage;
