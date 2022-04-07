import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import { useState } from 'react'
import './style/banner-style.css'


const BannerUpper = () => {
    const user = useSelector(state => state.session.user);
    const [searchActive, setSearchActive] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const history = useHistory();

    const showCreateButton = (user) => {
        if (user) {
            return (
                <>
                    <NavLink to="/create-project">
                        <div className='banner-create-project nav-button'>
                            <p>Create a project</p>
                        </div>
                    </NavLink>
                </>
            )
        }
        else { return null }
    }

    let links;
    if (user && !searchActive) {
        links = (
            <>
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
                <div className='banner-right-button-container'>
                        <div className='banner-search nav-button'>
                            <p onClick={() => setSearchActive(true)}>Search</p>
                        </div>
                    <LogoutButton />
                </div>
            </>
        )
    } else if (!user && !searchActive){
        links = (
            <>
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
            </>
        )
    }

    const handleSearch = (searchTerm) => {
        const termArray = searchTerm.split(" ");
        termArray.forEach((term) => {
            if (term === "") {
                return alert('invalid search term. (try removing space at the end)')
            };
        });
        let searchString = termArray.join("-");
        setSearchActive(false);
        return history.push(`/search/` + searchString)
    };

    return (
        <div
            className='banner-upper-container'
        >
            <div className={searchActive ? 'search-bar-container' : 'transition'}>
                    <input
                        placeholder='Search for projects...'
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                console.log("Searching!");
                                handleSearch(searchTerm)
                            }
                        }}
                        className='search-bar-input'
                        type="text"
                    />
                    <div className="cancel-search">
                        <p
                            onClick={() => setSearchActive(false)}
                            style={{color:"#444444", fontSize: "20px", cursor: "pointer"}}>X</p>
                    </div>
                </div>
            {links}
        </div>
    )
};

export default BannerUpper;
