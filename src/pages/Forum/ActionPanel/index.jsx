import React, { Component } from 'react';
import clsx from 'clsx';

import './styles.scss';

class ActionPanel extends Component {
  state = {
    topics: ['Newest', 'Topics', 'Questions', 'Bp'],
    currentTopic: 'Newest'
  };

  onButtonClick = topic => () => {
    this.setState({ currentTopic: topic });
  };

  render() {
    const { topics } = this.state;
    const classes = {
      button: topic => clsx(this.state.currentTopic === topic && 'active')
    };

    return (
      <div className="action-panel__wrapper">
        {topics.map((topic, id) => (
          <button
            key={id}
            className={classes.button(topic)}
            onClick={this.onButtonClick(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
    );
  }
}

export default ActionPanel;
