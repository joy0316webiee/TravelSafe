import React, { Component } from 'react';
import ReactPagniate from 'react-paginate';
import clsx from 'clsx';

import SideMenu from './SideMenu';
import TagSwitcher from './TagSwitcher';
import Post from './Post';
import MakePost from './Modals/MakePost';

import { isToday, sortByDate } from 'helpers/Date';
import { posts, currentUser } from './dummy.json';

import IconSearch from 'assets/images/ic_search_grey.png';
import './styles.scss';
class Forum extends Component {
  state = {
    tags: ['Newest', 'Topics', 'Questions', 'Bp'],
    totalPosts: posts,
    displayPosts: [],
    todayPosts: [],
    missions: [],
    selectedTag: 'Newest',
    searchTerm: '',
    currentUser,
    totalPages: 0,
    perPage: 5,
    offset: 0,
    openPostModal: false,
    openHamburger: false
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
    // prettier-ignore
    let { totalPosts, currentUser, selectedTag, searchTerm, offset, perPage } = this.state;

    // filter by tag
    let taggedPosts = [];
    switch (selectedTag) {
      case 'Newest':
        taggedPosts = totalPosts;
        break;
      case 'Topics':
        taggedPosts = totalPosts.filter(
          post => post.author._id === currentUser._id
        );
        break;
      case 'Questions':
        taggedPosts = totalPosts.filter(post => post.category === 'question');
        break;
      default:
        taggedPosts = totalPosts.filter(post => post.category === 'backpacker');
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
    const { totalPosts } = this.state;
    return totalPosts
      .reduce((acc, post) => {
        if (isToday(post.created_dt)) acc.push(post);
        return acc;
      }, [])
      .slice(0, 3);
  };

  getMissions = () => {
    const { totalPosts } = this.state;
    return sortByDate(
      totalPosts.filter(post => post.category === 'backpacker' && !post.closed)
    ).slice(0, 3);
  };

  onSearchIconClick = () => this.updateDisplayPosts();

  onSearchTermChange = e => this.setState({ searchTerm: e.target.value });

  onSearchTermKeyDown = e => {
    if (e.keyCode === 13) this.updateDisplayPosts();
  };

  onToggleHamburger = () => {
    this.setState({ openHamburger: !this.state.openHamburger });
  };

  handleModalPostShow = () => this.setState({ openPostModal: true });

  handleModalPostHide = () => this.setState({ openPostModal: false });

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

  handleForumPost = newPost => {
    this.setState(
      ({ totalPosts }) => ({
        totalPosts: [newPost, ...totalPosts]
      }),
      () => {
        this.updateDisplayPosts();
      }
    );
  };

  renderPagination = totalPages => (
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
  );

  render() {
    const {
      tags,
      displayPosts,
      todayPosts,
      missions,
      searchTerm,
      selectedTag,
      totalPages,
      openPostModal,
      openHamburger
    } = this.state;

    const classes = {
      menuWrapper: clsx('menu-wrapper', openHamburger && 'expanded'),
      icon: clsx('icon', openHamburger && 'crossed'),
      tag: tag => clsx('tag', selectedTag === tag && 'active')
    };

    return (
      <div className="forum-wrapper">
        <div className="header">
          <h1>Forum</h1>
          <p>Connect, travel and share</p>
        </div>
        <div className="content">
          <div className="left-pane">
            <div className="tag-switcher">
              <TagSwitcher tags={tags} onSwitch={this.handleTagSwitch} />
              <div className="makepost">
                <button onClick={this.handleModalPostShow}>Make a post</button>
              </div>
            </div>
            <div className="search-area">
              <div className="hamburger">
                <div className="icon-wrapper" onClick={this.onToggleHamburger}>
                  <span className={classes.icon}></span>
                </div>
                <div className={classes.menuWrapper}>
                  <ul className="menu">
                    <li className="post" onClick={this.handleModalPostShow}>
                      <button>Post</button>
                    </li>
                    {tags.map(tag => (
                      <li
                        key={tag}
                        className={classes.tag(tag)}
                        onClick={() => this.handleTagSwitch(tag)}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="search-field__wrapper">
                <div className="search-field">
                  <input
                    type="text"
                    value={searchTerm}
                    placeholder="Search"
                    onChange={this.onSearchTermChange}
                    onKeyDown={this.onSearchTermKeyDown}
                  />
                  <img
                    src={IconSearch}
                    alt="search"
                    onClick={this.onSearchIconClick}
                  />
                </div>
              </div>
            </div>
            <div className="posts">
              {displayPosts.length > 0 ? (
                displayPosts.map((post, id) => <Post key={id} post={post} />)
              ) : (
                <span>This feed's empty, make a post</span>
              )}
            </div>
            {totalPages > 0 && this.renderPagination(totalPages)}
          </div>
          <div className="right-pane">
            <SideMenu todayPosts={todayPosts} missions={missions} />
          </div>
        </div>
        <MakePost
          showModal={openPostModal}
          onPost={this.handleForumPost}
          onClose={this.handleModalPostHide}
        />
      </div>
    );
  }
}

export default Forum;
