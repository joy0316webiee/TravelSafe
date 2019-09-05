import React, { Component } from 'react';

import ActionPanel from './ActionPanel';
import Post from './Post';

import { posts, missions } from './dummy.json';
import './styles.scss';

const MODE_DEFAULT = 0;
const MODE_READ = 1;
const MODE_POST = 2;

class Forum extends Component {
  state = {
    displayPosts: [],
    mode: MODE_DEFAULT
  };

  componentDidMount() {
    this.setState({
      displayPosts: this.getTodayPosts()
    });
  }

  getTodayPosts = () => {
    return posts.reduce((acc, post) => {
      if (this.isToday(post.created_dt)) acc.push(post);
      return acc;
    }, []);
  };

  isToday = date => {
    // const tempDate = new Date();
    // const today = `${tempDate.getMonth() +
    //   1}/${tempDate.getDate()}/${tempDate.getFullYear()}`;

    // return new Date(today).getTime() === new Date(date).getTime();

    return new Date('09.03.2019').getTime() === new Date(date).getTime();
  };

  handlePostRead = id => {
    this.setState(({ displayPosts }) => ({
      displayPosts: displayPosts.filter(post => post._id === id),
      mode: MODE_READ
    }));
  };

  render() {
    const { displayPosts, mode } = this.state;

    return (
      <div className="forum-wrapper">
        <div className="left-pane">
          <div className="header">
            <h1>Forum</h1>
            <p>Connect, travel and share</p>
          </div>
          <div className="actions">
            <ActionPanel />
            <div className="makepost">
              <button>Make a post</button>
            </div>
          </div>
          <div className="search-area">
            <input type="search" placeholder="Search" />
          </div>
          <div className="posts">
            {displayPosts.slice(0, 4).map((post, id) => (
              <Post
                key={id}
                post={post}
                reading={mode === MODE_READ}
                onRead={this.handlePostRead}
              />
            ))}
          </div>
        </div>
        <div className="right-pane">
          <div className="sidemenu">
            <div className="today-posts">
              <div className="title">
                <h2>Todays posts</h2>
              </div>
              <div className="posts">
                {this.getTodayPosts()
                  .slice(0, 3)
                  .map((post, id) => (
                    <div key={id} className="post">
                      <div className="avatar">
                        <img
                          src={require(`../../${post.author}`)}
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
                      <h3>{mission}</h3>
                    </div>
                    <div className="actions">
                      <span>Explorer</span>
                      <span>BP</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Forum;
