import React, { useState } from 'react';
import LoginLogo from '../../assets/images/SVG/P-letter.svg';
import User from '../../assets/images/SVG/user.svg';
import useAuth from '../../hooks/useAuth';

import './Header.scss';

const Header = () => {
  const  {auth, logOut}  = useAuth();


  const clickHandler = () => {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  window.onclick = function(e) {
    if (!e.target.closest('.user-nav')) {
    var myDropdown = document.getElementById("myDropdown");
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
    }
  }

  return (
    <div className='header'>
      <p></p>
      <nav  className='user-nav'>
        <div onClick={clickHandler} className='user-nav__user'>
          <img src={User} alt='imagen de usuario' className='user-nav__user-photo' />
          <span className='user-nav__user-name'>{auth.name}</span>
          <div className='user-nav__user-drop' id="myDropdown">
            <button onClick={() => logOut()} className='user-nav__user-drop-btn'>Sign out</button>
          </div>
        </div>
      </nav>
    </div>
  )
};

export default Header;
