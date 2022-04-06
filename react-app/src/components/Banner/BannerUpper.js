import { NavLink } from 'react-router-dom';
import { useSelector} from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import './style/banner-style.css'

const BannerUpper = () => {
    const user = useSelector(state => state.session.user);

    let links;
    if (user) {
        links = (
            <div className='banner-right-button-container'>
                <NavLink to="">
                    {/* Create search functionality and link */}
                    <div className='banner-search nav-button'>
                        <p>Search</p>
                    </div>
                </NavLink>
                <LogoutButton />
            </div>
        )
    } else {
        links = (
            <div className='banner-right-button-container'>
                <NavLink to="">
                    <div className='banner-search nav-button'>
                        <p>Search</p>
                    </div>
                </NavLink>
                <NavLink to="/login">
                    <div className='banner-search nav-button'>
                        <p>Login</p>
                    </div>
                </NavLink>
                <NavLink to="/sign-up">
                    <div className='nav-button'>
                        <p>&nbsp;Sign Up</p>
                    </div>
                </NavLink>
            </div>
        )
    }

    const showCreateButton = (user) => {
        if(user) {
            return(
            <>
                <NavLink to="/create-project">
                <div className='banner-create-project nav-button'>
                    <p>Create a project</p>
                </div>
                </NavLink>
            </>
            )
        }
        else{ return null }
    }

    return (
        <div
            className='banner-upper-container'
        >
            {/* TODO : Add link paths to nav buttons */}
            <div className='banner-left-button-container'>
                <NavLink to="/categories">
                    <div className='banner-discover nav-button'>
                        <p>Discover</p>
                    </div>
                </NavLink>
                {showCreateButton(user)}
            </div>
            <NavLink exact to="/">
                <div>
                    <p className='banner-logo nav-button'>QUICKSTARTER</p>
                </div>
            </NavLink>
            {links}
            {/* <div className='banner-right-button-container'>
                <NavLink to="">
                    <div className='banner-search nav-button'>
                        <p>Search</p>
                    </div>
                </NavLink>
                <NavLink to="/login">
                    <div className='banner-search nav-button'>
                        <p>Login</p>
                    </div>
                </NavLink>
                <NavLink to="/sign-up">
                    <div className='nav-button'>
                        <p>&nbsp;Sign Up</p>
                    </div>
                </NavLink>
            </div> */}
        </div>
    )
};

export default BannerUpper;
