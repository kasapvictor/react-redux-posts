import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { routes } from './routes';
import { removePost, resetRemoveStatus, selectPostById } from './store';
import { PostAuthor } from './PostAuthor';
import { ReactionButtons } from './ReactionButtons';

export const Post = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { postId } = params;
  const postById = useSelector((state) => selectPostById(state, +postId));
  const postStatusRemove = useSelector((state) => state.posts.statusRemove);

  const handleRemovePost = (id) => () => {
    dispatch(removePost({ id }));
  };

  useEffect(() => {
    if (postStatusRemove === 'succeeded') {
      dispatch(resetRemoveStatus());
    }
  }, [postStatusRemove]);

  return (
    <section className="post">
      <div className="container">
        {postById ? (
          <article>
            <div className="postHeader">
              <h1 className="h1">{postById.title}</h1>
              <div className="postPreview__meta">
                <span className="small postPreview__meta-item"> Post ID: {postById.id}</span>
                <span className="small postPreview__meta-item"> Author: {<PostAuthor id={postById.userId} />} </span>
              </div>
              <div className="postTags tags">
                {postById.tags.map((tag, idx) => (
                  <span key={idx} className="postTag tags_item small">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="postBody">
              <div className="postContent">{postById.body}</div>
            </div>
            <div className="postFooter">
              <Link to={routes.postEdit(postById.id)} className="button">
                Edit post
              </Link>
              <button className="button button--delete" onClick={handleRemovePost(postById.id)}>
                {' '}
                Delete Post{' '}
              </button>
              <Link to={routes.home} className="link">
                [ Back to posts ]
              </Link>

              <div className="postReactions">
                <ReactionButtons post={postById} />
              </div>
            </div>
          </article>
        ) : (
          <>
            <h2 className="h2"> Post was removed or not existing! </h2>
            <Link to={routes.home} className="link">
              [ Back to posts ]
            </Link>
          </>
        )}
      </div>
    </section>
  );
};
