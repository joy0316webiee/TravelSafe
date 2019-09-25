import React, { Component } from 'react';
import clsx from 'clsx';

import { isEmpty } from 'helpers/Validate';

import ImgProfile from 'assets/images/profile.png';
import IconHome from 'assets/images/ic_home_white.png';
import IconEarth from 'assets/images/ic_earth_white.png';
import IconApartment from 'assets/images/ic_apartment_white.png';
import IconPhone from 'assets/images/ic_phone_white.png';
import IconEmail from 'assets/images/ic_email_white.png';
import IconFolder from 'assets/images/ic_folder_white.png';
import IconBook from 'assets/images/ic_book_white.png';
import IconGift from 'assets/images/ic_gift_white.png';
import './styles.scss';

class Profile extends Component {
  state = {
    trips: ['Chain island', 'Chain island', 'Chain island'],
    destinations: ['India', 'India', 'India'],
    tripInput: '',
    destinationInput: '',
    errors: []
  };

  validateError = field => {
    const { errors } = this.state;
    return errors.some(err => err.toLowerCase().includes(field));
  };

  onTripAdd = () => {
    const { tripInput } = this.state;

    if (isEmpty(tripInput)) {
      this.setState({ errors: this.state.errors.concat('trip') });
      return;
    }

    this.setState({
      errors: this.state.errors.filter(error => !error.includes('trip')),
      trips: this.state.trips.concat(tripInput),
      tripInput: ''
    });
  };

  onTripDelete = id => {
    this.setState({
      trips: this.state.trips.reduce((acc, trip, index) => {
        if (id !== index) acc.push(trip);
        return acc;
      }, [])
    });
  };

  onDestinationAdd = () => {
    const { destinationInput } = this.state;

    if (isEmpty(destinationInput)) {
      this.setState({ errors: this.state.errors.concat('destination') });
      return;
    }

    this.setState({
      errors: this.state.errors.filter(error => !error.includes('destination')),
      destinations: this.state.trips.concat(destinationInput),
      destinationInput: ''
    });
  };

  onDestinationDelete = id => {
    this.setState({
      destinations: this.state.destinations.reduce(
        (acc, destination, index) => {
          if (id !== index) acc.push(destination);
          return acc;
        },
        []
      )
    });
  };

  onInputChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { trips, destinations, tripInput, destinationInput } = this.state;

    const classes = {
      tripInput: clsx(this.validateError('trip') && 'error'),
      destinationInput: clsx(this.validateError('destination') && 'error')
    };

    return (
      <div className="profile-wrapper">
        <div className="container">
          <div className="left-pane">
            <div className="header">
              <img src={ImgProfile} alt="profile" />
              <button>Edit profile</button>
            </div>
            <div className="content">
              <div className="content-row">
                <div className="first-name">
                  <label>Name</label>
                  <input type="text" placeholder="First name" />
                </div>
                <div className="last-name">
                  <input type="text" placeholder="Last name" />
                </div>
              </div>
              <div className="content-row">
                <div className="address">
                  <img src={IconHome} alt="address" />
                  <input type="text" placeholder="Address" />
                </div>
                <div className="country">
                  <img src={IconEarth} alt="country" />
                  <input type="text" placeholder="Country" />
                </div>
              </div>
              <div className="content-row">
                <div className="city">
                  <img src={IconApartment} alt="city" />
                  <input type="text" placeholder="City" />
                </div>
                <div className="phone">
                  <img src={IconPhone} alt="phone" />
                  <input type="text" placeholder="Phone" />
                </div>
              </div>
              <div className="content-row">
                <div className="email">
                  <img src={IconEmail} alt="email" />
                  <input type="text" placeholder="Email" />
                </div>
                <div className="recommended">
                  <img src={IconFolder} alt="folder" />
                  <input type="text" placeholder="Recommended" />
                </div>
              </div>
            </div>
          </div>

          <div className="right-pane">
            <h2>Previous experience</h2>

            <div className="trips">
              <div className="header">
                <img src={IconBook} alt="book" />
                <input
                  className={classes.tripInput}
                  type="text"
                  name="tripInput"
                  value={tripInput}
                  placeholder="Small trips"
                  onChange={this.onInputChange}
                />
                <button onClick={this.onTripAdd}>+</button>
              </div>
              <div className="content">
                {trips.map((trip, id) => (
                  <div key={id} className="content-row">
                    <span>{trip}</span>
                    <button onClick={() => this.onTripDelete(id)}>-</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="destinations">
              <div className="header">
                <img src={IconGift} alt="gift" />
                <input
                  className={classes.destinationInput}
                  type="text"
                  name="destinationInput"
                  value={destinationInput}
                  placeholder="Destinations"
                  onChange={this.onInputChange}
                />
                <button onClick={this.onDestinationAdd}>+</button>
              </div>
              <div className="content">
                {destinations.map((destination, id) => (
                  <div key={id} className="content-row">
                    <span>{destination}</span>
                    <button onClick={() => this.onDestinationDelete(id)}>
                      -
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
