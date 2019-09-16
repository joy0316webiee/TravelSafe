import React, { Component } from 'react';
import ReactModal from 'react-modal';
import uuid from 'uuidv4';
import clsx from 'clsx';
import Tags from 'react-select-plus';
import 'react-select-plus/dist/react-select-plus.css';

import { isEmpty } from 'helpers/Validate';
import { today } from 'helpers/Date';
import { currentUser } from '../../dummy.json';

import './styles.scss';

ReactModal.setAppElement('#root');

const initFormState = {
  title: '',
  text: '',
  category: '',
  tags: [],
  errors: []
};
class MakePost extends Component {
  state = {
    showModal: this.props.showModal,
    ...initFormState
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({ ...this.props });
    }
  }

  clearForm = () => this.setState({ ...initFormState });

  validateForm = () => {
    const { title, text, category } = this.state;

    let errors = [];
    if (isEmpty(title)) errors.push('title is empty');
    if (isEmpty(text)) errors.push('text is empty');
    if (isEmpty(category)) errors.push('category is empty');
    return errors;
  };

  validateField = field => {
    const { errors } = this.state;
    return errors.some(err => err.toLowerCase().includes(field));
  };

  onPostClick = () => {
    const errors = this.validateForm();
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    const { category, title, text, tags } = this.state;
    const { onPost, onClose } = this.props;

    const newPost = {
      _id: uuid(),
      category,
      title,
      text,
      tags: tags.reduce((acc, tag) => acc.concat(tag.label), []),
      author: currentUser,
      liked_count: 0,
      commented_count: 0,
      comments: [],
      created_dt: today()
    };

    onPost(newPost);
    onClose();
    this.clearForm();
  };

  handleTagsChange = tags => this.setState({ tags });

  handleValueChange = state => event =>
    this.setState({ [state]: event.target.value });

  render() {
    const { showModal, tags, title, text, category } = this.state;
    const { onClose } = this.props;

    const tagOptions = [
      { value: 'explorer', label: 'Explorer' },
      { value: 'bp', label: 'BP' },
      { value: 'travel', label: 'Travel' },
      { value: 'destination', label: 'Destination' }
    ];

    const classes = {
      category: clsx(this.validateField('category') && 'error'),
      title: clsx(this.validateField('title') && 'error'),
      text: clsx(this.validateField('text') && 'error')
    };

    return (
      <ReactModal
        isOpen={showModal}
        onRequestClose={onClose}
        className="post-modal"
        overlayClassName="post-overlay"
      >
        <div className="modal-header">
          <h2>Make a Post</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="modal-content">
          <div className="category">
            <select
              value={category}
              className={classes.category}
              onChange={this.handleValueChange('category')}
            >
              <option value="">Category</option>
              <option value="general">General</option>
              <option value="question">Question</option>
              <option value="backpacker">Backpacker</option>
            </select>
          </div>
          <div className="tags">
            <Tags
              placeholder={'#Tags'}
              value={tags}
              multi={true}
              options={tagOptions}
              onChange={this.handleTagsChange}
            />
          </div>
          <div className="title">
            <input
              type="text"
              value={title}
              placeholder="Subject"
              className={classes.title}
              onChange={this.handleValueChange('title')}
            />
          </div>
          <div className="message">
            <textarea
              value={text}
              placeholder="Message"
              className={classes.text}
              onChange={this.handleValueChange('text')}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={this.onPostClick}>Post</button>
        </div>
      </ReactModal>
    );
  }
}

export default MakePost;
