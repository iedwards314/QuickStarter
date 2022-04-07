import { Link } from 'react-router-dom';
import './style/project-carousel.css';

const CarouselCard = ({ img, name, description, github, linkedIn }) => {

    return (
        <div className='carousel-card-container'>
            <div>
                <img
                    className="carousel-image"
                    src={img} alt="holding a looking glass" />

            </div>
            <div className='carousel-text-container'>
                <p className='carousel-text-title'>Developer : {name}</p>
                <div className='carousel-description-container'>
                    <p className={'carousel-text'}>{description}</p>
                </div>
            </div>
            <div className='link-container'>
                <Link  to={{ pathname: `${github}` }} target="_blank">
                    <div>
                        <img
                            className="about-link-1"
                            src={"https://drive.google.com/uc?id=1bUgL9fta4jKfFMmILYjbLqnB7qZK-L-0"} alt="github"></img>
                    </div>
                </Link>
                <Link to={{ pathname: `${linkedIn}` }} target="_blank">
                    <div>
                        <img
                            className="about-link-1"
                            src={"https://drive.google.com/uc?id=1KqGlyMoNcg4bmR6bY-dtgLsfh1-DnoS3"} alt="linkedin"></img>
                    </div>
                </Link>
            </div>
        </div>
    )
};
export default CarouselCard;
