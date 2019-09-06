import React, { Component } from 'react';
import clsx from 'clsx';

import './styles.scss';

class TagSwitcher extends Component {
  state = {
    tags: ['Newest', 'Topics', 'Questions', 'Bp'],
    currentTag: 'Newest'
  };

  onButtonClick = tag => () => {
    this.props.onSwitch(tag);

    this.setState({ currentTag: tag });
  };

  render() {
    const { tags } = this.state;
    const classes = {
      button: tag => clsx(this.state.currentTag === tag && 'active')
    };

    return (
      <div className="tag-switcher__wrapper">
        {tags.map((tag, id) => (
          <button
            key={id}
            className={classes.button(tag)}
            onClick={this.onButtonClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    );
  }
}

export default TagSwitcher;
