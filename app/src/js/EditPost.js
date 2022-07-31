import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { postUpdate } from './store';
import { routes } from './routes';

export const EditPost = () => {
  const params = useParams();
  const { postId } = params;
  const postById = useSelector((state) => state.posts.find((post) => post.id === postId));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState(postById.title);
  const [content, setContent] = useState(postById.content);

  const formRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const handleTitle = () => {
    setTitle(titleRef.current.value);
  };

  const handleContent = () => {
    setContent(contentRef.current.value);
  };

  const handleEditPost = () => {
    if (title !== '' && content !== '') {
      dispatch(postUpdate({ id: postId, title, content }));
      setTitle('');
      setContent('');
      navigate(routes.post(postId));
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="postAdd">
          <div className="postAdd__header">
            <h3 className="h3">Edit {postById.title}</h3>
            <span className="small postPreview__id"> Post ID: {postById.id}</span>
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
                      onChange={handleTitle}
                      ref={titleRef}
                    />
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
                <button type="button" className="button form__button form__button-submit" onClick={handleEditPost}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
