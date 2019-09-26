import React, { Component } from 'react';
import clsx from 'clsx';

import ImgPaypal from 'assets/images/paypal.png';
import './styles.scss';
class Payment extends Component {
  state = {
    currentHistory: 0
  };

  onHistoryCardClick = id => this.setState({ currentHistory: id });

  render() {
    const { currentHistory } = this.state;
    const classes = {
      historyCard: id =>
        clsx('payment-history__card', currentHistory === id && 'active')
    };

    return (
      <div className="payment-wrapper">
        <div className="make-payment">
          <div className="subscription-status">
            <div className="content">
              <label>Subscription active</label>
              <span></span>
            </div>
            <div className="action">
              <button>Cancel</button>
            </div>
          </div>

          <h2>Payment</h2>
          <div className="form">
            <div className="form-row">
              <label>Card name</label>
              <input type="text" placeholder="Name" />
            </div>
            <div className="form-row">
              <label>Card number</label>
              <input type="text" placeholder="Number" />
            </div>
            <div className="form-row double">
              <div className="expire-date">
                <label>Expire data</label>
                <input type="text" placeholder="XX/XX" />
              </div>
              <div className="cvv">
                <label>CVV</label>
                <input type="text" placeholder="XXX" />
              </div>
            </div>
            <div className="submit">
              <button className="edit">Edit</button>
              <p>or do you want to change to</p>
              <button className="paypal">
                <img src={ImgPaypal} alt="paypal" />
              </button>
            </div>
          </div>
        </div>
        <div className="payment-history">
          <h2>Payment history</h2>

          <div className="content">
            {[...Array(12)].map((_, id) => (
              <div
                key={id}
                className={classes.historyCard(id)}
                onClick={() => this.onHistoryCardClick(id)}
              >
                <div className="left-pane">
                  <span>India destination</span>
                  <button>Download receipt</button>
                </div>
                <div className="right-pane">
                  <span className="price">9.99$</span>
                  <span className="date">20.09.2019</span>
                </div>
              </div>
            ))}
          </div>

          <div className="scroll-pane">
            <span></span>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
