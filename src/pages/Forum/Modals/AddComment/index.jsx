import React, { Component } from 'react';
import ReactModal from 'react-modal';
import ReactPagniate from 'react-paginate';
import clsx from 'clsx';
import uuid from 'uuidv4';

import Comment from '../../Comment';
import { today, sortByDate } from 'helpers/Date';
import { isEmpty } from 'helpers/Validate';
import { currentUser } from '../../dummy.json';

import IconComment from 'assets/images/ic_comment_grey.png';
import IconThumbup from 'assets/images/ic_thumbup_grey.png';
import './styles.scss';

ReactModal.setAppElement('#root');

class AddComment extends Component {
  state = {
    ...this.props,
    displayComments: [],
    commentText: '',
    totalPages: 0,
    perPage: 3,
    offset: 0,
    commented: false,
    errors: []
  };

  componentDidMount() {
    this.initState();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.showModal !== this.props.showModal) {
      this.setState({ showModal: this.props.showModal });
    } else if (prevProps.liked !== this.props.liked) {
      this.setState({ liked: this.props.liked });
    } else if (prevProps.post !== this.props.post) {
      this.setState({ post: this.props.post }, () => {
        this.initState();
      });
    }

    if (prevProps !== this.props) {
      this.setState({ ...this.props });
    }
  }

  initState = () => {
    const totalPages = this.getTotalPages();
    const bestAnswer = this.getBestAnswer();
    const displayComments = this.getDisplayComments(bestAnswer);

    this.setState({ totalPages, bestAnswer, displayComments });
  };

  updateDisplayComments = () => {
    const { bestAnswer } = this.state;
    this.setState({ displayComments: this.getDisplayComments(bestAnswer) });
  };

  getTotalPages = () => {
    const { post, perPage } = this.state;
    return Math.ceil(post.comments.length / perPage);
  };

  getBestAnswer = () => {
    const { post } = this.state;
    return post.comments.reduce(
      (acc, comment) => (acc.liked_count > comment.liked_count ? acc : comment),
      {}
    );
  };

  getDisplayComments = bestAnswer => {
    const { post, offset, perPage } = this.state;
    if (!post.comments.length) return [];

    let sortedComments = sortByDate(
      post.comments.filter(comment => comment._id !== bestAnswer._id)
    );
    if (!offset) sortedComments.unshift(bestAnswer);
    return sortedComments.slice(offset, offset + perPage);
  };

  validateForm = () => {
    const { commentText } = this.state;

    let errors = [];
    if (isEmpty(commentText)) errors.push('comment is empty');
    return errors;
  };

  validateField = field => {
    const { errors } = this.state;
    return errors.some(err => err.toLowerCase().includes(field));
  };

  onCommentTextChange = e => this.setState({ commentText: e.target.value });

  onWriteCommentClick = e => {
    const errors = this.validateForm();
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    const { commentText } = this.state;

    const newComment = {
      _id: uuid(),
      text: commentText,
      author: currentUser,
      liked_count: 0,
      created_dt: today()
    };

    this.props.onComment(newComment);

    this.setState({
      commented: true,
      commentText: ''
    });
  };

  handlePageChange = data => {
    const { perPage } = this.state;
    const currentPage = data.selected;

    this.setState(
      {
        offset: currentPage * perPage
      },
      () => this.updateDisplayComments()
    );
  };

  renderCommentsPane = () => {
    let {
      commentText,
      totalPages,
      bestAnswer,
      commented,
      displayComments
    } = this.state;

    const classes = {
      commentText: clsx(this.validateField('comment') && 'error')
    };

    return (
      <div className="comments-pane">
        <div className="write-comment">
          <textarea
            className={classes.commentText}
            value={commentText}
            placeholder="Comment"
            onChange={this.onCommentTextChange}
          />
          <button onClick={this.onWriteCommentClick} disabled={commented}>
            Send
          </button>
        </div>
        <div className="comments">
          {displayComments.map((comment, id) => (
            <Comment
              key={id}
              comment={comment}
              highlighted={comment._id === bestAnswer._id}
            />
          ))}
        </div>
        <div className="pagination-wrapper">
          <ReactPagniate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={4}
            onPageChange={this.handlePageChange}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      </div>
    );
  };

  render() {
    const { post, liked, showModal, onLike, onClose } = this.state;

    return (
      <ReactModal
        isOpen={showModal}
        className="comment-modal"
        overlayClassName="comment-overlay"
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
              <div className="feedback">
                <div className="feedback-commented">
                  <img src={IconComment} alt="commented" />
                  <span>{post.commented_count}</span>
                </div>
                <div className="feedback-liked">
                  <img src={IconThumbup} alt="liked" />
                  <span>{post.liked_count}</span>
                </div>
                <button className="like" onClick={onLike}>
                  {liked ? 'Unlike' : 'Like'}
                </button>
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
          <div className="forum-text">
            <p>{post.text}</p>
          </div>
          {this.renderCommentsPane()}
        </div>
      </ReactModal>
    );
  }
}

export default AddComment;
