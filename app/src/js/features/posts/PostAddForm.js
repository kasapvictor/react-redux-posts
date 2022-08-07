import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNewPost } from '../../store';

export const PostAddForm = () => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const users = useSelector((state) => state.users);
  const [requestStatus, setRequestStatus] = useState('idle');
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleBody = (e) => {
    setBody(e.target.value);
  };

  const handleAuthor = (e) => {
    setUserId(e.target.value);
  };

  const isValid = [title, body, userId].every(Boolean) && requestStatus === 'idle';

  const handleAddPost = async () => {
    if (!isValid) {
      return false;
    }

    try {
      setError(null);
      setRequestStatus('pending');

      await dispatch(addNewPost({ title, body, userId: +userId, reactions: 0, tags: [] })).unwrap();

      setTitle('');
      setBody('');
      setUserId('');
      formRef.current.reset();
    } catch (err) {
      setRequestStatus('error');
      setError(err.message);
    } finally {
      setRequestStatus('idle');
    }

    return true;
  };

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
                />
              </label>
            </div>

            <div className="form__row">
              <label htmlFor="author" className="form__label">
                <span className="form__label-name">Author:</span>
                <select className="form__field form__select" name="author" id="author" onChange={handleAuthor}>
                  <option value="">Chose Author</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.firstName} {user.lastName}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="form__row">
              <label htmlFor="content" className="form__label">
                <span className="form__label-name">Content:</span>
                <textarea className="form__field" name="content" value={body} id="content" onChange={handleBody} />
              </label>
            </div>
          </div>

          <div className="form__buttons">
            <button
              type="button"
              className="button form__button form__button-submit"
              onClick={handleAddPost}
              disabled={!isValid}
            >
              {requestStatus === 'pending' ? 'Process ...' : 'Add new post'}
            </button>
          </div>

          {error && <div className="error__message">{error}</div>}
        </form>
      </div>
    </div>
  );
};
