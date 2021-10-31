import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'
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
    let errors = []
    if (username.length < 5) errors.push('Username must be at least 5 characters')
    if (username.length > 40) errors.push('Username must 40 characters or less')
    if (password !== repeatPassword) errors.push("Passwords must match")
    if (errors.length) {
      setErrors(errors)
      return null
    }
    setErrors([])

    dispatch(signUp(username, email, password));

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
    <>
    <div className='signup-wrapper'>
      <div className='signup-container'>
        <div className='signup-info'>
          <h2>Clip It</h2>
          <p>Sign up to view and upload</p>
        </div>
        <form onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div className='errors' key={ind}>{error}</div>
            ))}
          </div>
          <div>

            <input
            placeholder='Username'
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>

            <input
              placeholder='Email'
              type='email'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>

            <input
            placeholder='Password'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>

            <input
            placeholder="Confirm Password"
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div className='signup-btns'>
            <button id='signup-confirm' type='submit'>Sign Up</button>

          </div>
        </form>

      </div>

    </div>
    </>
  );
};

export default SignUpForm;
