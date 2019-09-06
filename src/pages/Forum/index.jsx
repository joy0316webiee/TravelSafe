import React, { Component } from 'react';

import SideMenu from './SideMenu';
import TagSwitcher from './TagSwitcher';
import Post from './Post';
import { isToday, sortByDate } from 'helpers/Date';
import { posts, currentUser } from './dummy.json';

import './styles.scss';
class Forum extends Component {
  state = {
    displayPosts: [],
    todayPosts: [],
    missions: [],
    selectedTag: 'Newest',
    searchTerm: '',
    currentUser,
    currentPost: {},
    openReadModal: false,
    openCreateModal: false
  };

  componentDidMount() {
    this.setState({
      displayPosts: this.getDisplayPosts(),
      todayPosts: this.getTodayPosts(),
      missions: this.getMissions()
    });
  }

  updateDisplayPosts = () => {
    this.setState({ displayPosts: this.getDisplayPosts() });
  };

  getDisplayPosts = () => {
    let { currentUser, selectedTag, searchTerm } = this.state;

    // filter by tag
    let taggedPosts = [];
    switch (selectedTag) {
      case 'Newest':
        taggedPosts = posts;
        break;
      case 'Topics':
        taggedPosts = posts.filter(post => post.author._id === currentUser._id);
        break;
      case 'Questions':
        taggedPosts = posts.filter(post => post.category === 'question');
        break;
      default:
        taggedPosts = posts.filter(post => post.category === 'backpacker');
    }

    // filter by search term
    searchTerm = searchTerm.toLowerCase();
    let filteredPosts = taggedPosts.reduce((acc, post) => {
      if (
        post.title.toLowerCase().includes(searchTerm) ||
        post.text.toLowerCase().includes(searchTerm)
      )
        acc.push(post);
      return acc;
    }, []);

    return sortByDate(filteredPosts).slice(0, 6);
  };

  getTodayPosts = () => {
    return posts
      .reduce((acc, post) => {
        if (isToday(post.created_dt)) acc.push(post);
        return acc;
      }, [])
      .slice(0, 3);
  };

  getMissions = () => {
    return sortByDate(
      posts.filter(post => post.category === 'backpacker' && !post.closed)
    ).slice(0, 3);
  };

  onSearchTermChange = e => this.setState({ searchTerm: e.target.value });

  onSearchTermKeyDown = e => {
    if (e.keyCode === 13) this.updateDisplayPosts();
  };

  handlePostOpen = post => {
    this.setState({
      openReadModal: true,
      currentPost: post
    });
  };

  handleTagSwitch = tag =>
    this.setState(
      {
        selectedTag: tag
      },
      () => this.updateDisplayPosts()
    );

  render() {
    const { displayPosts, todayPosts, missions, searchTerm } = this.state;

    return (
      <div className="forum-wrapper">
        <div className="left-pane">
          <div className="header">
            <h1>Forum</h1>
            <p>Connect, travel and share</p>
          </div>
          <div className="actions">
            <TagSwitcher onSwitch={this.handleTagSwitch} />
            <div className="makepost">
              <button>Make a post</button>
            </div>
          </div>
          <div className="search-area">
            <input
              type="search"
              value={searchTerm}
              placeholder="Search"
              onChange={this.onSearchTermChange}
              onKeyDown={this.onSearchTermKeyDown}
            />
          </div>
          <div className="posts">
            {displayPosts.map((post, id) => (
              <Post
                key={id}
                post={post}
                onOpen={() => this.handlePostOpen(post)}
              />
            ))}
          </div>
        </div>
        <div className="right-pane">
          <SideMenu todayPosts={todayPosts} missions={missions} />
        </div>
      </div>
    );
  }
}

export default Forum;
