import React, { Component } from 'react';
import ReactModal from 'react-modal';

import './styles.scss';

ReactModal.setAppElement('#root');

class MakePost extends Component {
  state = { ...this.props };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({ ...this.props });
    }
  }

  render() {
    const { post, showModal, onClose } = this.state;

    return (
      <ReactModal
        isOpen={showModal}
        onRequestClose={onClose}
        className="post-modal"
        overlayClassName="post-overlay"
      >
        <p>Modal text!</p>
        <button onClick={onClose}>&times;</button>
      </ReactModal>
    );
  }
}

export default MakePost;
