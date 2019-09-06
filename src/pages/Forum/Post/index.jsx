import React, { Component } from 'react';
import clsx from 'clsx';

// import Comment from '../Comment';
// import { sortByDate } from 'helpers/Date';

import IconComment from 'assets/images/ic_comment_white.png';
import IconThumbup from 'assets/images/ic_thumbup_white.png';
import './styles.scss';

class Post extends Component {
  state = {
    post: { ...this.props.post }
    // bestAnswer: {}
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.post !== prevProps.post) {
      this.setState({ post: this.props.post });
    }
  }

  // getBestAnswer = comments => {
  //   return comments.reduce((acc, comment) =>
  //     acc.liked_count > comment.liked_count ? acc : comment
  //   );
  // };

  // getRecentComments = (comments, exceptionId) => {
  //   const sortedComments = sortByDate(
  //     comments.filter(comment => comment._id !== exceptionId)
  //   );

  //   return sortedComments.slice(0, 2);
  // };

  // renderCommentsPane = comments => {
  //   const bestAnswer = this.getBestAnswer(comments);
  //   const recentComments = this.getRecentComments(comments, bestAnswer._id);

  //   return (
  //     <div className="comments-pane__wrapper">
  //       <div className="write-comment">
  //         <textarea placeholder="Comment" />
  //         <button>Send</button>
  //       </div>
  //       <div className="comments">
  //         {bestAnswer && (
  //           <div className="best-answer">
  //             <Comment comment={bestAnswer} highlighted />
  //             <span className="">Best answer</span>
  //           </div>
  //         )}
  //         <div className="recents">
  //           {recentComments.map((comment, id) => (
  //             <div key={id} className="comment">
  //               <Comment comment={comment} />
  //               <span className="date">{`Posted ${comment.created_dt}`}</span>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  renderFeedBack = ({ commented_count, liked_count }, expanded) => (
    <div className="feedback">
      <div className="feedback-commented">
        <img src={IconComment} alt="commented" />
        <span>{commented_count}</span>
      </div>
      <div className="feedback-liked">
        <img src={IconThumbup} alt="liked" />
        <span>{liked_count}</span>
      </div>
      {expanded && (
        <div className="like">
          <button>Like</button>
        </div>
      )}
    </div>
  );

  renderBackPacker = () => ({
    tags: tags => (
      <div className="tags">
        {tags.map((tag, id) => (
          <span key={id}>{tag}</span>
        ))}
      </div>
    ),
    status: closed => closed && <span className="closed">[Closed]</span>
  });

  render() {
    const { onRead, expanded } = this.props;
    const { post } = this.state;

    const isBackPacker = post.category === 'backpacker';

    const classes = {
      postWrapper: clsx('post-wrapper', expanded && 'full-height'),
      title: clsx(expanded && 'text-dark'),
      text: clsx('text', !expanded && 'text-truncate')
    };

    return (
      <div className={classes.postWrapper} onClick={onRead}>
        <div className="info">
          <div className="avatar">
            <img src={require(`../../../${post.author.avatar}`)} alt="author" />
          </div>
          {!isBackPacker && this.renderFeedBack(post, expanded)}
        </div>
        <div className="details">
          <div className="header">
            <div className="labels">
              <h2 className={classes.title}>{post.title}</h2>
              <span className="category">{`[${post.category}]`}</span>
              {isBackPacker && this.renderBackPacker().status(post.closed)}
            </div>
            <span>{`Posted ${post.created_dt}`}</span>
          </div>
          {isBackPacker && this.renderBackPacker().tags(post.tags)}
          <div className={classes.text}>
            <p>{post.text}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
