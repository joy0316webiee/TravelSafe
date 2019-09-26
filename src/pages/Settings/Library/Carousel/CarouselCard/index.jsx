import React, { Component } from 'react';
import clsx from 'clsx';

import './styles.scss';

class CarouselCard extends Component {
  state = {
    selected: this.props.selected
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selected !== this.props.selected) {
      this.setState({ selected: this.props.selected });
    }
  }

  render() {
    const { selected } = this.state;
    const { onSelect, cardDetails } = this.props;

    const classes = {
      container: clsx('card-container', selected && 'selected')
    };

    return (
      <div className="carousel-card__wrapper">
        <div className={classes.container} onClick={onSelect}>
          <img
            src={require(`../../../../../assets/images/${cardDetails.previewImage}`)}
            alt="preview"
          />
          <span>{cardDetails.title}</span>
        </div>
      </div>
    );
  }
}

export default CarouselCard;
