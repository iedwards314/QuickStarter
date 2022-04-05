import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './style/signup.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='form-container'>
      <form className='signup-container' onSubmit={onSignUp}>
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
          }}>Sign up</p>
        </div>
        <div className='signup-username-input'>
          <input
            type='text'
            name='username'
            placeholder='Username'
            onChange={updateUsername}
            value={username}
            className='signup-username-box'
          />
        </div>
        <div className='signup-email-input'>
          <input
            type='text'
            name='email'
            placeholder='Email'
            onChange={updateEmail}
            value={email}
            className='signup-email-box'
          />
        </div>
        <div className='signup-password-input'>
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={updatePassword}
            value={password}
            className='signup-password-box'
          />
        </div>
        <div className='signup-reppass-input'>
          <input
            type='password'
            name='repeat_password'
            placeholder='Repeat password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            className='signup-reppass-box'
            required={true}
          />
        </div>
        <button className='signup-submit-button' type='submit'>Create account</button>
      </form>
      <div className='signup-tologin'>
        <p style={{margin:"0px 5px 0px 0px", padding:"20px 0px"}}>Have an account?</p>
        <a href='/login' style={{color:"#44fff0"}}>Log in</a>
      </div>
    </div>
  );
};

export default SignUpForm;
