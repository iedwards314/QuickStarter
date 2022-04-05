import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './style/login.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='form-container'>
      <form className='login-container' onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <p style={{
            fontSize: "28px",
            margin: "60px 0px 20px 0px",
            color: "white",
          }}>Log in</p>
        </div>
        <div className='login-email-input'>
          <label htmlFor='email'></label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            className='login-email-box'
          />
        </div>
        <div className='login-password-input'>
          <label htmlFor='password'></label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            className='login-password-box'
          />
        </div>
        <button className='login-submit-button' type='submit'>Log in</button>
      </form>
      <div className='login-tosignup'>
        <p style={{ margin: "0px 5px 0px 0px", padding: "20px 0px" }}>New to Kickstarter?</p>
        <a href='/sign-up' style={{ color: "#44fff0" }}>Click here.</a>
      </div>
    </div>
  );
};

export default LoginForm;
