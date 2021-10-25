
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import UploadModal from '../UploadModal';
import './NavBar.css'
const NavBar = () => {
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
          <input type="text" placeholder='Search...' />
        </div>
        <div className='top-nav-left'>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
          <LogoutButton />
        </div>
      </div>
      {/* <ul>
        <li>

        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>

      </ul> */}
    </nav>
  );
}

export default NavBar;
