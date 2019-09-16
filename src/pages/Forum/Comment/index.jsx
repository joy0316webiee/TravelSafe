import React, { Component } from 'react';

import { currentUser } from '../dummy.json';

import IconThumbup from 'assets/images/ic_thumbup_grey.png';
import './styles.scss';

class Comment extends Component {
  state = {
    ...this.props,
    liked: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({ ...this.props, liked: false });
    }
  }

  onLikeClick = () =>
    this.setState(({ comment, liked }) => {
      let liked_count = liked
        ? comment.liked_count - 1
        : comment.liked_count + 1;

      return {
        comment: {
          ...comment,
          liked_count
        },
        liked: !liked
      };
    });

  renderAuthorName = ({ _id, name }) => {
    if (_id === currentUser._id) return <h2 className="by-me">By me</h2>;
    else return <h2>{name}</h2>;
  };

  render() {
    const { comment, liked, highlighted } = this.state;

    return (
      <div className="comment-wrapper">
        <div className="comment-header">
          <div className="left-pane">
            <div className="avatar">
              <img
                src={require(`../../../${comment.author.avatar}`)}
                alt="avatar"
              />
            </div>
            <div className="info">
              {this.renderAuthorName(comment.author)}
              {highlighted && <span className="best">[Best Answer]</span>}
              <div className="feedback">
                <div className="liked">
                  <img src={IconThumbup} alt="liked" />
                  <span>{comment.liked_count}</span>
                </div>
                <button className="like" onClick={this.onLikeClick}>
                  {liked ? 'Unlike' : 'Like'}
                </button>
              </div>
            </div>
          </div>
          <div className="right-pane">
            <span className="date">{`Commented ${comment.created_dt}`}</span>
          </div>
        </div>
        <div className="comment-content">
          <div className="comment-text">
            <p>{comment.text}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
