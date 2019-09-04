import React, { Component } from 'react';
import clsx from 'clsx';

import './styles.scss';

class ActionPanel extends Component {
  state = {
    activeId: 2
  };

  onButtonClick = id => () => {
    this.setState({ activeId: id });
  };

  render() {
    const buttonList = ['Newest', 'Topics', 'Questions', 'Bp'];
    const classes = {
      button: id => clsx(this.state.activeId === id && 'active')
    };

    return (
      <div className="action-panel__wrapper">
        {buttonList.map((label, id) => (
          <button
            key={id}
            className={classes.button(id)}
            onClick={this.onButtonClick(id)}
          >
            {label}
          </button>
        ))}
      </div>
    );
  }
}

export default ActionPanel;
