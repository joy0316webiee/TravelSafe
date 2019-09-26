import React, { Component } from 'react';

import Carousel from './Carousel';

import IconSearch from 'assets/images/ic_search_grey.png';
import './styles.scss';
class Library extends Component {
  state = {
    searchTerm: '',
    selectedCard: 0,
    cards: [
      { title: 'Usa Plaza', previewImage: 'setting_bg1.png' },
      { title: 'Usa Plaza', previewImage: 'setting_bg2.png' },
      { title: 'Usa Plaza', previewImage: 'setting_bg3.png' },
      { title: 'Usa Plaza', previewImage: 'setting_bg1.png' },
      { title: 'Usa Plaza', previewImage: 'setting_bg2.png' },
      { title: 'Usa Plaza', previewImage: 'setting_bg3.png' },
      { title: 'Usa Plaza', previewImage: 'setting_bg1.png' },
      { title: 'Usa Plaza', previewImage: 'setting_bg2.png' },
      { title: 'Usa Plaza', previewImage: 'setting_bg3.png' },
      { title: 'Usa Plaza', previewImage: 'setting_bg1.png' },
      { title: 'Usa Plaza', previewImage: 'setting_bg2.png' },
      { title: 'Usa Plaza', previewImage: 'setting_bg3.png' }
    ]
  };

  onSearchTermChange = e => this.setState({ searchTerm: e.target.value });

  onSearchTermKeyDown = e => {
    if (e.keyCode === 13) {
      //TODO
    }
  };

  handleCarouselChange = selectedCard => this.setState({ selectedCard });

  render() {
    const { searchTerm, selectedCard, cards } = this.state;

    const wrapperStyle = {
      backgroundImage:
        'url(' +
        require(`../../../assets/images/${cards[selectedCard].previewImage}`) +
        ')'
    };

    console.log(wrapperStyle);

    return (
      <div className="library-wrapper" style={wrapperStyle}>
        <div className="top-pane">
          <div className="container">
            <div className="search-field__wrapper">
              <div className="search-field">
                <input
                  type="text"
                  value={searchTerm}
                  placeholder="Search"
                  onChange={this.onSearchTermChange}
                  onKeyDown={this.onSearchTermKeyDown}
                />
                <img
                  src={IconSearch}
                  alt="search"
                  onClick={this.onSearchIconClick}
                />
              </div>
            </div>
            <div className="destination">
              <div className="header">
                <h2>Indian destination</h2>
                <span className="process">80% Done</span>
              </div>
              <div className="details">
                <span>Description</span>
                <p>
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book.
                  It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged.
                  It was popularised in the 1960s with the release of Letraset
                  sheets containing Lorem Ipsum passages, and more recently with
                  desktop publishing software like Aldus PageMaker including
                  versions of Lorem Ipsum
                </p>
                <button>Watch</button>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-pane">
          <Carousel
            cards={cards}
            selectedCard={selectedCard}
            onSelect={this.handleCarouselChange}
          />
        </div>
      </div>
    );
  }
}

export default Library;
