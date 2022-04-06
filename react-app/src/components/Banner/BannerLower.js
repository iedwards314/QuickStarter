import { NavLink } from 'react-router-dom';
import './style/banner-style.css'

const BannerLower = () => {
    return (
        <div
            className='banner-lower-container'
        >
            {/* TODO : Add link paths to nav buttons */}
            <NavLink to="/categories/6">
                <div className='lower-nav-button nav-button'>
                    <p>Tech</p>
                </div>
            </NavLink>
            <NavLink to="/categories/5">
                <div className='lower-nav-button nav-button'>
                    <p>Food</p>
                </div>
            </NavLink>
            <NavLink to="/categories/4">
                <div className='lower-nav-button nav-button'>
                    <p>Film</p>
                </div>
            </NavLink>
            <NavLink to="/categories/3">
                <div className='lower-nav-button nav-button'>
                    <p>Health</p>
                </div>
            </NavLink>
            <NavLink to="/categories/2">
                <div className='lower-nav-button nav-button'>
                    <p>Music</p>
                </div>
            </NavLink>
            <NavLink to="/categories/1">
                <div className='lower-nav-button nav-button'>
                    <p>Games</p>
                </div>
            </NavLink>
        </div>
    )
};

export default BannerLower;
