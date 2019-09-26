import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CarouselCard from './CarouselCard';

import './styles.scss';

class Carousel extends Component {
  state = {
    settings: {
      className: 'center',
      dots: false,
      infinite: true,
      speed: 500,
      slidesToScroll: 1,
      initialSlide: 0,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    },
    selectedCard: this.props.selectedCard
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedCard !== this.props.selectedCard) {
      this.setState({ selectedCard: this.props.selectedCard });
    }
  }

  handleCardSelect = id => {
    this.setState({ selectedCard: id });
    this.props.onSelect(id);
  };

  render() {
    const { selectedCard, settings } = this.state;
    const { cards } = this.props;

    return (
      <Slider {...settings}>
        {cards.map((card, id) => (
          <CarouselCard
            key={id}
            cardDetails={card}
            selected={selectedCard === id}
            onSelect={() => this.handleCardSelect(id)}
          />
        ))}
      </Slider>
    );
  }
}

export default Carousel;
