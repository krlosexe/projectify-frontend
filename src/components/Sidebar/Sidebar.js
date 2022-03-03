import React from 'react';
import useAuth from '../../hooks/useAuth';

import './Sidebar.scss'

const Sidebar = () => {
  const { changeDash } = useAuth();


  return(
    <>
    <nav className='side-bar'>
      <ul className='side-nav'>
        <li className='side-nav__item'>
          <a onClick={() => {changeDash(0)}} className='side-nav__link'>
            <span>Add weekly report</span>
          </a>
        </li>
        <li className='side-nav__item'>
          <a onClick={() => {changeDash(1)}} className='side-nav__link'>
              <span>Check and Update past reports</span>
            </a>
        </li>
      </ul> 
     
    </nav>
    </>
  ) 
};

export default Sidebar;
