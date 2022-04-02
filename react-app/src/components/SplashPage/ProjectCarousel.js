import { Carousel } from 'react-responsive-carousel';
import CarouselCard from './CarouselCard';
import './style/project-carousel.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProjectCarousel = () => {
    return (
        <div className='carousel-container'>
            <Carousel
                infiniteLoop={true}
                showArrows={false}
                showStatus={false}
                autoPlay={true}
                showThumbs={false}
                width={"800px"}>
                <div>
                    <CarouselCard />
                </div>
                <div>
                    <CarouselCard />
                </div>
                <div>
                    <CarouselCard />
                </div>
            </Carousel>
        </div>
    )
};

export default ProjectCarousel;
