import './style/project-carousel.css';

const CarouselCard = ({img, name, description}) => {
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
                    <p className='carousel-text'>{description}</p>
                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
};
export default CarouselCard;
