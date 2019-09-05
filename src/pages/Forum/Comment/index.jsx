import React from 'react';

import IconThumbup from 'assets/images/ic_thumbup_white.png';

const Comment = ({ comment, highlighted }) => {
  return (
    <div className="comment-wrapper">
      <div className="details">
        <div className="title">
          <img src={require(`../../../${comment.author.avatar}`)} />
          <h3>James</h3>
        </div>
        <div className="text">
          <p>{comment.text}</p>
        </div>
      </div>
      <div className="info">
        <div className="feedback-liked">
          <img src={IconThumbup} alt="liked" />
          <span>{comment.liked_count}</span>
        </div>
        <div className="like">
          <button>Like</button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
