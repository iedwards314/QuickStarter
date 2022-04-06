import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from "react-router-dom";



const LogoutButton = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const onLogout = async (e) => {
        history.push('/')
        await dispatch(logout());
    };

  // return <button onClick={onLogout}>Logout</button>;
  return (
      <div className='banner-search nav-button'
        onClick={onLogout}>
        <p>Log Out</p>
      </div>
  )
};

export default LogoutButton;
