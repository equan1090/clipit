import React, { useState, useEffect } from 'react';
import {NavLink, useHistory } from 'react-router-dom';

import {useSelector} from 'react-redux'
import LogoutButton from '../auth/LogoutButton';
import UploadForm from '../UploadForm/UploadForm';
import Modal from '../ProfileModal/Modal';
import UploadModal from '../UploadModal/UploadModal';
import uploadImage from '../../images/upload-icon-20631.png'
import './NavBar.css'
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
  const user = useSelector(state => state.session.user)
  const history = useHistory()

  useEffect(() => {
    if(!isOpen) return;

    const closeMenu = () => {
      setIsOpen(false)

    }

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu)
  }, [isOpen])

  // useEffect(() => {
  //   if(!uploadOpen) return
  //   const closeMenu = () => {
  //     setUploadOpen(false)
  //   }
  //   document.addEventListener('click', closeMenu);
  //   return () => document.removeEventListener('click', closeMenu)
  // }, [uploadOpen])

  const profilePage = () => {
    history.push(`/users/${user?.id}`)
  }


    return (
      <nav className='top-nav-container'>
        <div className='top-nav-menu'>
          <div className='top-nav-left'>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
            <div className='upload-btn' onClick={() => setUploadOpen(true)}>
                <img id='upload-icon' src={uploadImage} alt="" />
            </div>
            <UploadModal open={uploadOpen} onClose = {() => setUploadOpen(false)}>
              <div className='upload-modal-container'>
                <UploadForm />
              </div>
            </UploadModal>
          </div>
          <div className='top-nav-middle'>
          </div>
          <div className='top-nav-left'>
            <img className='profile-pic' onClick={(e) => setIsOpen(true)} src={user.avatar_url} alt="" />
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
              <div className='profile-modal-items'>
                <div onClick={profilePage} className='profile-modal-btns'>
                  My Profile
                </div>
                <div className='profile-modal-btns'>
                  <LogoutButton />
                </div>
              </div>
            </Modal>

          </div>
        </div>
      </nav>
    );



}

export default NavBar;
