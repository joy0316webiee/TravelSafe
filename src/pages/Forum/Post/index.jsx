import React, { Component } from 'react';
import clsx from 'clsx';

import IconComment from 'assets/images/ic_comment.png';
import IconThumbup from 'assets/images/ic_thumbup.png';
import './styles.scss';

class Post extends Component {
  state = {
    readMode: false
  };

  render() {
    const { readMode } = this.state;
    const { post } = this.props;

    const classes = {
      wrapper: clsx('post-wrapper', readMode && 'full-height'),
      title: clsx(readMode && 'orange')
    };

    return (
      <div className={classes.wrapper}>
        <div className="info">
          <div className="avatar">
            <img src={require(`../../../${post.author}`)} alt="author" />
          </div>
          <div className="feedback">
            <div className="feedback-commented">
              <img src={IconComment} alt="commented" />
              <span>{post.commented_count}</span>
            </div>
            <div className="feedback-liked">
              <img src={IconThumbup} alt="liked" />
              <span>{post.liked_count}</span>
            </div>
            {readMode && (
              <div className="like">
                <button>Like</button>
              </div>
            )}
          </div>
        </div>
        <div className="details">
          <div className="header">
            <h2 className={classes.title}>{post.title}</h2>
            <span>{`Posted ${post.created_dt}`}</span>
          </div>
          <div className="text">
            <p>{post.text}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
