import React from 'react';
import { Link } from 'react-router-dom';

import ImgLogo from 'assets/images/logo.png';
import './styles.scss';

const Navbar = () => (
  <nav className="navbar-wrapper">
    <ul className="menu">
      <li className="menu-item">
        <Link to={'/'} className="nav-link">
          HOME
        </Link>
      </li>
      <li className="menu-item">
        <Link to={'/contact'} className="nav-link">
          CONTACT
        </Link>
      </li>
      <li className="logo">
        <Link to={'/'} className="nav-link">
          <img src={ImgLogo} alt="logo" />
        </Link>
      </li>
      <li className="menu-item">
        <Link to={'/about'} className="nav-link">
          ABOUT
        </Link>
      </li>
      <li className="menu-item">
        PRODUCTS
        <ul className="sub-menu animate">
          <li className="sub-menu__item">
            <Link to={'/forum'} className="nav-link">
              Forum
            </Link>
          </li>
          <li className="sub-menu__item">
            <Link to={'/blog'} className="nav-link">
              Blog
            </Link>
          </li>
          <li className="sub-menu__item">
            <Link to={'/lecture'} className="nav-link">
              Courses
            </Link>
          </li>
        </ul>
      </li>
      <li className="menu-item pull-right">
        <Link to={'/signin'} className="nav-link">
          SIGN IN
        </Link>
      </li>
    </ul>
  </nav>
);

export { Navbar };
