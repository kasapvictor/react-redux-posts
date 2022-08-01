import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import { postAdd } from './store';

export const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const users = useSelector((state) => state.users);
  const [userId, setUserId] = useState(null);

  const formRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const authorRef = useRef(null);

  const handleTitle = () => {
    setTitle(titleRef.current.value);
  };

  const handleContent = () => {
    setContent(contentRef.current.value);
  };

  const handleAuthor = () => {
    setUserId(authorRef.current.value);
  };

  const handleAddPost = () => {
    const id = nanoid();

    if (!!title && !!content) {
      dispatch(postAdd({ id, title, content, userId }));
      setTitle('');
      setContent('');
      formRef.current.reset();
    }
  };

  const disabled = !title || !content;

  return (
    <div className="postAdd">
      <div className="postAdd__header">
        <h3 className="h3">Add a new post</h3>
      </div>
      <div className="postAdd__body">
        <form className="form postAdd__form" ref={formRef}>
          <div className="form__body">
            <div className="form__row">
              <label htmlFor="title" className="form__label">
                <span className="form__label-name">Title:</span>
                <input
                  className="form__field"
                  type="text"
                  name="title"
                  value={title}
                  id="title"
                  placeholder="Some title ..."
                  onChange={handleTitle}
                  ref={titleRef}
                />
              </label>
            </div>

            <div className="form__row">
              <label htmlFor="author" className="form__label">
                <span className="form__label-name">Author:</span>
                <select
                  className="form__field form__select"
                  name="author"
                  id="author"
                  onChange={handleAuthor}
                  ref={authorRef}
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="form__row">
              <label htmlFor="content" className="form__label">
                <span className="form__label-name">Content:</span>
                <textarea
                  className="form__field"
                  name="content"
                  value={content}
                  id="content"
                  onChange={handleContent}
                  ref={contentRef}
                />
              </label>
            </div>
          </div>

          <div className="form__buttons">
            <button
              type="button"
              className="button form__button form__button-submit"
              onClick={handleAddPost}
              disabled={disabled}
            >
              Add new post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
