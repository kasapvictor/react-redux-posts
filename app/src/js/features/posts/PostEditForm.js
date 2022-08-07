import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { routes } from '../../common/routes';
import { updatePost, selectPostById, resetUpdateStatus } from '../../store';

export const PostEditForm = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { postId } = params;

  const postById = useSelector((state) => selectPostById(state, +postId));
  const navigate = useNavigate();
  const [title, setTitle] = useState(postById.title);
  const [body, setBody] = useState(postById.body);
  const [tags, setTags] = useState(postById.tags.map((tag) => tag).join(', '));

  const postStatusUpdate = useSelector((state) => state.posts.statusUpdate);
  const postError = useSelector((state) => state.posts.error);

  const titleRef = useRef();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleBody = (e) => {
    setBody(e.target.value);
  };

  const handleTags = (e) => {
    setTags(e.target.value);
  };

  const isValid = [title, body].every(Boolean);

  const handleEditPost = async () => {
    if (!isValid) {
      return false;
    }

    const formattedTags = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '');

    dispatch(updatePost({ id: postId, title, body, reactions: postById.reactions, tags: formattedTags }));

    return true;
  };

  useEffect(() => {
    if (postStatusUpdate === 'succeeded') {
      dispatch(resetUpdateStatus());
      navigate(routes.post(postId));
    }
  }, [postStatusUpdate]);

  useEffect(() => {
    titleRef.current.focus();
  }, [titleRef]);

  const disabled = !title || !body;

  return (
    <section className="section">
      <div className="container">
        <div className="postAdd">
          <div className="postAdd__header">
            <h3 className="h3">Edit: "{postById.title}"</h3>
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
                    <textarea onChange={handleBody} className="form__field" value={body} name="content" id="content" />
                  </label>
                </div>

                <div className="form__row">
                  <label htmlFor="tags" className="form__label">
                    <span className="form__label-name">
                      Tags: <span className="small">(add , after each tag)</span>
                    </span>
                    <input
                      className="form__field"
                      id="tags"
                      type="text"
                      name="tags"
                      value={tags}
                      onChange={handleTags}
                    />
                  </label>
                </div>
              </div>

              <div className="form__buttons">
                <button
                  type="button"
                  className="button form__button form__button-submit"
                  onClick={handleEditPost}
                  disabled={disabled}
                >
                  {postStatusUpdate === 'loading' ? 'Updating ...' : 'Save post'}
                </button>
              </div>

              {postStatusUpdate === 'failed' && <div className="error__message">{postError}</div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
