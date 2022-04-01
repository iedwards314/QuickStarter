import { NavLink } from 'react-router-dom';
import './style/banner-style.css'

const BannerUpper = () => {
    return (
        <div
            className='banner-upper-container'
        >
            {/* TODO : Add link paths to nav buttons */}
            <div className='banner-left-button-container'>
                <NavLink to="">
                    <div className='banner-discover nav-button'>
                        <p>Discover</p>
                    </div>
                </NavLink>
                <NavLink to="">
                    <div className='banner-create-project nav-button'>
                        <p>Create a project</p>
                    </div>
                </NavLink>
            </div>
            <NavLink to="/">
                <div>
                    <p className='banner-logo nav-button'>QUICKSTARTER</p>
                </div>
            </NavLink>
            <div className='banner-right-button-container'>
                <NavLink to="">
                    <div className='banner-search nav-button'>
                        <p>Search</p>
                    </div>
                </NavLink>
                <NavLink to="">
                    <div className='nav-button'>
                        <p>Login</p>
                    </div>
                </NavLink>
            </div>
        </div>
    )
};

export default BannerUpper;
