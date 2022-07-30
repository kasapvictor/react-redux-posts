import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import { postAdd } from './store';

export const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const formRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const handleTitle = () => {
    setTitle(titleRef.current.value);
  };

  const handleContent = () => {
    setContent(contentRef.current.value);
  };

  const handleAddPost = () => {
    if (title !== '' && content !== '') {
      dispatch(postAdd({ id: nanoid(), title, content }));
      setTitle('');
      setContent('');
      formRef.current.reset();
    }
  };

  return (
    <div className="postAdd">
      <div className="postAdd__header">
        <h3 className="h3">Add new post</h3>
      </div>
      <div className="postAdd__body">
        <form className="form postAdd__form" ref={formRef}>
          <div className="form__body">
            <label htmlFor="title" className="form__label">
              <span className="form__label-name">Title:</span>
              <input
                className="form__field"
                type="text"
                name="title"
                value={title}
                id="title"
                onChange={handleTitle}
                ref={titleRef}
              />
            </label>

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

          <div className="form__buttons">
            <button type="button" className="button form__button form__button-submit" onClick={handleAddPost}>
              Add new post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
