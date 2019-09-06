import React from 'react';

import './styles.scss';

const SideMenu = ({ todayPosts, missions }) => (
  <div className="sidemenu-wrapper">
    <div className="today-posts">
      <div className="title">
        <h2>Todays posts</h2>
      </div>
      <div className="posts">
        {todayPosts.map((post, id) => (
          <div key={id} className="post">
            <div className="avatar">
              <img
                src={require(`../../../${post.author.avatar}`)}
                alt="avatar"
              />
            </div>
            <div className="details">
              <h3>{post.title}</h3>
              <p>{post.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="listed-missions">
      <div className="title">
        <h2>Listed missions</h2>
      </div>
      <div className="missions">
        {missions.map((mission, id) => (
          <div key={id} className="mission">
            <div className="title">
              <h3>{mission.title}</h3>
            </div>
            <div className="tags">
              {mission.tags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SideMenu;
