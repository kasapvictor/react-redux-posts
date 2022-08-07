import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { routes } from './routes';

import { PostAuthor } from './PostAuthor';
import { Spinner } from './Spinner';
import { ReactionButtons } from './ReactionButtons';
import { fetchPosts, selectPostById, selectPostsIds } from './store';

// https://redux.js.org/style-guide/#connect-more-components-to-read-data-from-the-store
const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));

  return (
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
        <ReactionButtons post={post} />
      </div>
    </article>
  );
};

const RenderPostsExcerpt = () => {
  const postsIds = useSelector(selectPostsIds);
  return postsIds.map((postId) => <PostExcerpt key={postId} postId={postId} />);
};

export const Posts = () => {
  const dispatch = useDispatch();
  const postStatus = useSelector((state) => state.posts.statusFetch);
  const postError = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  return (
    <section className="postsPreview">
      {postStatus === 'failed' && <div className="error__message">{postError}</div>}

      {postStatus === 'loading' && <Spinner text="Loading..." />}

      {postStatus === 'succeeded' && <RenderPostsExcerpt />}
    </section>
  );
};
