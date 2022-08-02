import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { routes } from './routes';

import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';

const RenderPosts = ({ posts }) =>
  posts.map((post) => (
    <article key={post.id} className="postPreview">
      <div className="postPreview__header">
        <h3 className="h3 postPreview__title">{post.title}</h3>
        <div className="postPreview__meta">
          <span className="small postPreview__meta-item"> Post ID: {post.id}</span>
          <span className="small postPreview__meta-item"> Author: {<PostAuthor id={post.userId} />} </span>
          <span className="small postPreview__meta-item"> Created: {<TimeAgo timestamp={post.date} />} </span>
        </div>
      </div>

      <div className="postPreview__body">
        <div className="postPreview__excerpt">{post.content.substring(0, 100)}...</div>
      </div>
      <div className="postPreview__footer">
        <Link to={routes.post(post.id)} className="button">
          Read post
        </Link>
      </div>

      <ReactionButtons post={post} />
    </article>
  ));

export const Posts = () => {
  const postsList = useSelector((state) => state.posts);
  const postsOrderedByDate = postsList.slice().sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section className="postsPreview">
      <RenderPosts posts={postsOrderedByDate} />
    </section>
  );
};
