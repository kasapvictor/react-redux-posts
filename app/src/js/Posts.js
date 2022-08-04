import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { routes } from './routes';

import { PostAuthor } from './PostAuthor';
import { Spinner } from './Spinner';
import { ReactionButtons } from './ReactionButtons';

import { fetchPosts, selectAllPosts } from './store';

const RenderPostsPreviews = ({ posts }) =>
  posts.map((post) => (
    <article key={post.id} className="postPreview">
      <div className="postPreview__header">
        <h3 className="h3 postPreview__title">{post.title}</h3>
        <div className="postPreview__meta">
          <span className="small postPreview__meta-item"> Post ID: {post.id}</span>
          <span className="small postPreview__meta-item"> Author: {<PostAuthor id={post.userId} />} </span>
        </div>
      </div>

      <div className="postPreview__body">
        <div className="postPreview__excerpt">{post.body.substring(0, 100)}...</div>
      </div>
      <div className="postPreview__footer">
        <Link to={routes.post(post.id)} className="button">
          Read post
        </Link>
      </div>

      {/* <ReactionButtons post={post.id} /> */}
    </article>
  ));

export const Posts = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector((state) => state.posts.status);
  const postError = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  return (
    <section className="postsPreview">
      {postStatus === 'failed' && <div className="error__message">{postError}</div>}

      {postStatus !== 'succeeded' ? <Spinner text="Loading..." /> : <RenderPostsPreviews posts={posts} />}
    </section>
  );
};
