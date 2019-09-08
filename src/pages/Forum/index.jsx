import React, { Component } from 'react';
import ReactPagniate from 'react-paginate';

import SideMenu from './SideMenu';
import TagSwitcher from './TagSwitcher';
import Post from './Post';
import MakePost from './Modals/MakePost';

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
    totalPages: 0,
    perPage: 5,
    offset: 0
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
    let { currentUser, selectedTag, searchTerm, offset, perPage } = this.state;

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

    this.setState({ totalPages: Math.ceil(filteredPosts.length / perPage) });

    return sortByDate(filteredPosts).slice(offset, offset + perPage);
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

  handleTagSwitch = tag =>
    this.setState(
      {
        selectedTag: tag
      },
      () => this.updateDisplayPosts()
    );

  handlePageChange = data => {
    const { perPage } = this.state;
    const currentPage = data.selected;

    this.setState(
      {
        offset: currentPage * perPage
      },
      () => this.updateDisplayPosts()
    );
  };

  render() {
    const {
      displayPosts,
      todayPosts,
      missions,
      searchTerm,
      totalPages
    } = this.state;

    return (
      <div className="forum-wrapper">
        <div className="left-pane">
          <div className="header">
            <h1>Forum</h1>
            <p>Connect, travel and share</p>
          </div>
          <div className="tag-switcher">
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
              <Post key={id} post={post} />
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
        <div className="right-pane">
          <SideMenu todayPosts={todayPosts} missions={missions} />
        </div>
        <MakePost />
      </div>
    );
  }
}

export default Forum;
