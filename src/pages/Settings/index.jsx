import React, { Component } from 'react';

import Sidebar from './Sidebar';
import Profile from './Profile';
import Payment from './Payment';
import Library from './Library';
import Inbox from './Inbox';

import './styles.scss';

class Settings extends Component {
  state = {
    currentPage: 'Library'
  };

  handleMenuChange = currentPage => this.setState({ currentPage });

  getCurrentPage = () => {
    const { currentPage } = this.state;

    switch (currentPage) {
      case 'Payment':
        return Payment;
      case 'Library':
        return Library;
      case 'Inbox':
        return Inbox;
      default:
        return Profile;
    }
  };

  render() {
    const SettingPanel = this.getCurrentPage();

    return (
      <div className="settings-wrapper">
        <Sidebar onChange={this.handleMenuChange} />
        <SettingPanel />
      </div>
    );
  }
}

export default Settings;
