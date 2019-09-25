import React, { Component } from 'react';
import clsx from 'clsx';

import './styles.scss';

class Sidebar extends Component {
  state = {
    menuItems: [
      { name: 'Profile', image: 'ic_profile_white' },
      { name: 'Payment', image: 'ic_credit_white' },
      { name: 'Library', image: 'ic_library_white' },
      { name: 'Inbox', image: 'ic_inbox_white' },
      { name: 'Log out', image: 'ic_logout_white' }
    ],
    currentItem: 'Profile'
  };

  onMenuChange = name => {
    this.setState({ currentItem: name });
    this.props.onChange(name);
  };

  render() {
    const { menuItems, currentItem } = this.state;
    const classes = {
      menuItem: id => clsx('side-menu__item', id === currentItem && 'active')
    };

    return (
      <div className="sidebar-wrapper">
        <h1 className="header">Hello backpacker</h1>
        <p className="name">James Connor</p>

        <ul className="side-menu">
          {menuItems.map(({ name, image }, id) => (
            <li
              key={id}
              className={classes.menuItem(name)}
              onClick={() => this.onMenuChange(name)}
            >
              <img
                src={require(`../../../assets/images/${image}.png`)}
                alt="avatar"
              />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
