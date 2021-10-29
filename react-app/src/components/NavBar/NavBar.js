import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import ReactPlayer from 'react-player';
import {useSelector} from 'react-redux'
import LogoutButton from '../auth/LogoutButton';
import UploadModal from '../UploadModal';
import './NavBar.css'
const NavBar = () => {

  const user = useSelector(state => state.session.user)

  if(!user){

    return (
      <nav className='top-nav-container'>
        <div className='top-nav-menu'>
          <div className='top-nav-left'>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>

          </div>
          <div className='top-nav-middle'>
            {/* <input type="text" placeholder='Search...' /> */}
          </div>
          <div className='top-nav-left'>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>

          </div>
        </div>
      </nav>
    );
  }else{
    return (
      <nav className='top-nav-container'>
        <div className='top-nav-menu'>
          <div className='top-nav-left'>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
            <UploadModal />
          </div>
          <div className='top-nav-middle'>
            {/* <input type="text" placeholder='Search...' /> */}
          </div>
          <div className='top-nav-left'>
            <NavLink to={`/users/${user.id}`}>
              Profile
            </NavLink>
            <LogoutButton />
          </div>
        </div>
      </nav>
    );
  }


}

export default NavBar;
