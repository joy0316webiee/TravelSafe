import React, { Component, Fragment } from 'react';
import clsx from 'clsx';

import Comment from '../Comment';

import IconComment from 'assets/images/ic_comment_white.png';
import IconThumbup from 'assets/images/ic_thumbup_white.png';
import './styles.scss';

class Post extends Component {
  state = {
    post: { ...this.props.post },
    bestAnswer: {},
    reading: this.props.reading || false
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.reading !== prevProps.reading) {
      this.setState({ reading: this.props.reading });
    }
  }

  getBestAnswer = comments => {
    return comments.reduce((acc, comment) =>
      acc.liked_count > comment.liked_count ? acc : comment
    );
  };

  getRecentComments = (comments, exceptionId) => {
    const sortedComments = comments
      .filter(comment => comment._id !== exceptionId)
      .sort(
        (a, b) =>
          new Date(b.created_dt).getTime() - new Date(a.created_dt).getTime()
      );

    return sortedComments.slice(0, 2);
  };

  onPostClick = id => {
    this.props.onRead(id);
  };

  renderCommentsPane = comments => {
    const bestAnswer = this.getBestAnswer(comments);
    const recentComments = this.getRecentComments(comments, bestAnswer._id);

    return (
      <div className="comments-pane__wrapper">
        <div className="write-comment">
          <textarea placeholder="Comment" />
          <button>Send</button>
        </div>
        <div className="comments">
          {bestAnswer && (
            <div className="best-answer">
              <Comment comment={bestAnswer} highlighted />
              <span className="">Best answer</span>
            </div>
          )}
          <div className="recents">
            {recentComments.map((comment, id) => (
              <div key={id} className="comment">
                <Comment comment={comment} />
                <span className="date">{`Posted ${comment.created_dt}`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { post, reading } = this.state;

    const classes = {
      postWrapper: clsx('post-wrapper', reading && 'full-height'),
      title: clsx(reading && 'text-dark'),
      text: clsx('text', !reading && 'text-truncate')
    };

    return (
      <Fragment>
        <div
          className={classes.postWrapper}
          onClick={() => this.onPostClick(post._id)}
        >
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
              {reading && (
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
            <div className={classes.text}>
              <p>{post.text}</p>
            </div>
          </div>
        </div>

        {reading && this.renderCommentsPane(post.comments)}
      </Fragment>
    );
  }
}

export default Post;
