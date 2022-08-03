import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { routes } from './routes';
import { postUpdate, selectPostById } from './store';

export const PostEditForm = () => {
  const params = useParams();
  const { postId } = params;
  const postById = useSelector((state) => selectPostById(state, postId));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState(postById.title);
  const [content, setContent] = useState(postById.content);

  const titleRef = useRef();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleEditPost = () => {
    if (title !== '' && content !== '') {
      dispatch(postUpdate({ id: postId, title, content }));
      navigate(routes.post(postId));
    }
  };

  useEffect(() => {
    titleRef.current.focus();
  }, [titleRef]);

  return (
    <section className="section">
      <div className="container">
        <div className="postAdd">
          <div className="postAdd__header">
            <h3 className="h3">Edit {postById.title}</h3>
            <span className="small postPreview__id"> Post ID: {postById.id}</span>
          </div>
          <div className="postAdd__body">
            <form className="form postAdd__form">
              <div className="form__body">
                <div className="form__row">
                  <label htmlFor="title" className="form__label">
                    <span className="form__label-name">Title:</span>
                    <input
                      className="form__field"
                      id="title"
                      type="text"
                      name="title"
                      value={title}
                      ref={titleRef}
                      onChange={handleTitle}
                    />
                  </label>
                </div>

                <div className="form__row">
                  <label htmlFor="content" className="form__label">
                    <span className="form__label-name">Content:</span>
                    <textarea
                      onChange={handleContent}
                      className="form__field"
                      value={content}
                      name="content"
                      id="content"
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
