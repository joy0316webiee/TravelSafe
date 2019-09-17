import React, { Component } from 'react';
import ReactModal from 'react-modal';

import './styles.scss';

ReactModal.setAppElement('#root');

class SendMessage extends Component {
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
        className="message-modal"
        overlayClassName="message-overlay"
      >
        <div className="modal-header">
          <div className="left-pane">
            <div className="avatar">
              <img
                src={require(`../../../../${post.author.avatar}`)}
                alt="avatar"
              />
            </div>
            <div className="info">
              <h2>{post.title}</h2>
              <div className="tags">
                {post.tags.map((tag, id) => (
                  <span key={id}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="right-pane">
            <span className="date">{`Posted ${post.created_dt}`}</span>
          </div>
          <div className="close">
            <button onClick={onClose}>&times;</button>
          </div>
        </div>
        <div className="modal-content">
          <div className="text">
            <p>{post.text}</p>
          </div>
          <div className="message">
            <textarea placeholder="Message to Backpacker" />
            <div className="submit">
              <button>Send</button>
            </div>
          </div>
        </div>
      </ReactModal>
    );
  }
}

export default SendMessage;
