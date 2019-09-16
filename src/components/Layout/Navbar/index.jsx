import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ImgLogo from 'assets/images/logo.png';
import './styles.scss';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar-wrapper">
        <ul className="menu">
          <li className="menu-item">
            <Link to={'/'} className="nav-link">
              HOME
            </Link>
          </li>
          <li className="menu-item">
            <Link to={'/'} className="nav-link">
              CONTACT
            </Link>
          </li>
          <li className="menu-logo">
            <Link to={'/'} className="nav-link">
              <img src={ImgLogo} alt="logo" />
            </Link>
          </li>
          <li className="menu-item">
            <Link to={'/'} className="nav-link">
              ABOUT
            </Link>
          </li>
          <li className="menu-item">
            PRODUCTS
            <ul className="sub-menu animate">
              <li className="sub-menu__item">
                <Link to={'/'} className="nav-link">
                  Forum
                </Link>
              </li>
              <li className="sub-menu__item">
                <Link to={'/'} className="nav-link">
                  Blog
                </Link>
              </li>
              <li className="sub-menu__item">
                <Link to={'/'} className="nav-link">
                  Courses
                </Link>
              </li>
            </ul>
          </li>
          <li className="menu-item signin">
            <Link to={'/'} className="nav-link">
              SIGN IN
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export { Navbar };
