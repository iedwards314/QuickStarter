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
                    <CarouselCard
                        name={"Anthony Arellano"}
                        linkedIn={"https://www.linkedin.com/in/antarellano/"}
                        github={"https://github.com/badjub1es"}
                        description={"Full Stack Software Engineer | Javascript | Python | React.js | Redux.js | PostgreSQL | Express | Node.js"}
                        img={"https://media-exp1.licdn.com/dms/image/C5603AQEMfoI1QucysQ/profile-displayphoto-shrink_200_200/0/1517630088884?e=1654732800&v=beta&t=D_d4ilGDH57zA_hp4TrorBkNbQlc-dnJJ9obhXKGMV0"} />
                </div>
                <div>
                    <CarouselCard
                        name={"Ian Edwards"}
                        linkedIn={"https://www.linkedin.com/in/edwards-ian/"}
                        github={"https://github.com/iedwards314"}
                        description={"Full Stack Software Engineer | Javascript | Python | React.js | Redux.js | PostgreSQL | Express | Node.js"}
                        img={"https://drive.google.com/uc?id=1Lw1PEN2P86MX35sstUaTpVwrEhmiUws0"} />
                </div>
                <div>
                    <CarouselCard
                        name={"Jason Li"}
                        linkedIn={"https://www.linkedin.com/in/jason-li-6668b81ba/"}
                        github={"https://github.com/itsjongy"}
                        description={"Full Stack Software Engineer | Javascript | Python | React.js | Redux.js | PostgreSQL | Express | Node.js"}
                        img={"https://drive.google.com/uc?id=1Oha_zLSEoo-6ve4INgjraY1-vIq_T0t4"} />
                </div>
                <div>
                    <CarouselCard
                        name={"Morgan Gravelat"}
                        linkedIn={"https://www.linkedin.com/in/morgan-gravelat-1927b4194/"}
                        github={"https://github.com/MorganGravelat"}
                        description={"I recognize the importance of communication, and accuracy. I strive for perfection and try to display my active imagination in all my work."}
                        img={"https://drive.google.com/uc?id=1shmo_iOrEUJd2n7FJhD5PM6KkzKhH8xf"} />
                </div>
            </Carousel>
        </div>
    )
};

export default ProjectCarousel;
