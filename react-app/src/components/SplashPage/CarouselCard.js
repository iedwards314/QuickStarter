import './style/project-carousel.css';

const CarouselCard = () => {
    return (
        <div className='carousel-card-container'>
            {/* TODO : Replace with Database information */}
            {/* Current information is only for example purposes */}
            <img
                className="carousel-image"
                src={"https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"} />
            <div className='carousel-text-container'>
                <p className='carousel-text-title'>Totally Cool Photography Pay Me Dollars</p>
                <p className='carousel-text'>Forreal pay me idiot LOL, I promise I'm not going to steal all your money HAHAHAHA. </p>
            </div>
        </div>
    )
};

export default CarouselCard;
