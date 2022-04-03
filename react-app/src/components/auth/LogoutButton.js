import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
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
