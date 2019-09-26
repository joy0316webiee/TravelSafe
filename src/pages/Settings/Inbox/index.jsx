import React, { Component } from 'react';
import clsx from 'clsx';

import './styles.scss';

class Inbox extends Component {
  state = {
    currentAlert: 0,
    currentInbox: 0
  };

  onAlertCardClick = id => this.setState({ currentAlert: id });

  onInboxCardClick = id => this.setState({ currentInbox: id });

  render() {
    const { currentAlert, currentInbox } = this.state;

    const classes = {
      alertCard: id => clsx('alert-card', currentAlert === id && 'active'),
      inboxCard: id => clsx('inbox-card', currentInbox === id && 'active')
    };

    return (
      <div className="inbox-wrapper">
        <div className="container">
          <div className="alerts">
            <h2>Alerts</h2>

            <div className="content">
              {[...Array(12)].map((_, id) => (
                <div
                  key={id}
                  className={classes.alertCard(id)}
                  onClick={() => this.onAlertCardClick(id)}
                >
                  <div className="left-pane">
                    <span>James sent a travel tip</span>
                    <button>Checkout</button>
                  </div>
                  <div className="right-pane">
                    <span className="date">20.09.2019</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="inbox">
            <h2>Inbox</h2>

            <div className="content">
              {[...Array(12)].map((_, id) => (
                <div
                  key={id}
                  className={classes.inboxCard(id)}
                  onClick={() => this.onInboxCardClick(id)}
                >
                  <div className="left-pane">
                    <span>
                      industry. Lorem Ipsum has been the industry's standard
                      dummy
                    </span>
                    <button>Reload</button>
                  </div>
                  <div className="right-pane">
                    <span className="date">20.09.2019</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Inbox;
