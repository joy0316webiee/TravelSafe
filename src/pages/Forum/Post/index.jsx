import React, { Component } from 'react';

import AddComment from '../Modals/AddComment';
import SendMessage from '../Modals/SendMessage';

import IconComment from 'assets/images/ic_comment_white.png';
import IconThumbup from 'assets/images/ic_thumbup_white.png';
import './styles.scss';

class Post extends Component {
  state = {
    post: { ...this.props.post },
    liked: false,
    openModal: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.post !== prevProps.post) {
      this.setState({ post: this.props.post });
    }
  }

  handleModalShow = () => this.setState({ openModal: true });

  handleModalClose = () => this.setState({ openModal: false });

  handlePostLike = () =>
    this.setState(({ post, liked }) => {
      let liked_count = liked ? post.liked_count - 1 : post.liked_count + 1;

      return {
        post: {
          ...post,
          liked_count
        },
        liked: !liked
      };
    });

  handleCommentAdd = newComment =>
    this.setState(({ post }) => ({
      post: {
        ...post,
        comments: [newComment, ...post.comments],
        commented_count: post.commented_count + 1
      }
    }));

  renderFeedBack = ({ commented_count, liked_count }) => (
    <div className="feedback">
      <div className="feedback-commented">
        <img src={IconComment} alt="commented" />
        <span>{commented_count}</span>
      </div>
      <div className="feedback-liked">
        <img src={IconThumbup} alt="liked" />
        <span>{liked_count}</span>
      </div>
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
    const { post, liked, openModal } = this.state;

    const isBackPacker = post.category === 'backpacker';

    return (
      <div className="post-wrapper" onClick={this.handleModalShow}>
        <div className="info">
          <div className="avatar">
            <img src={require(`../../../${post.author.avatar}`)} alt="author" />
          </div>
          {!isBackPacker && this.renderFeedBack(post)}
        </div>
        <div className="details">
          <div className="header">
            <div className="labels">
              <h2>{post.title}</h2>
              <span className="category">{`[${post.category}]`}</span>
              {isBackPacker && this.renderBackPacker().status(post.closed)}
            </div>
            <span>{`Posted ${post.created_dt}`}</span>
          </div>
          {isBackPacker && this.renderBackPacker().tags(post.tags)}
          <div className="text">
            <p>{post.text}</p>
          </div>
        </div>

        {isBackPacker ? (
          <SendMessage
            showModal={openModal}
            post={post}
            onClose={this.handleModalClose}
          />
        ) : (
          <AddComment
            showModal={openModal}
            post={post}
            liked={liked}
            onComment={this.handleCommentAdd}
            onLike={this.handlePostLike}
            onClose={this.handleModalClose}
          />
        )}
      </div>
    );
  }
}

export default Post;
