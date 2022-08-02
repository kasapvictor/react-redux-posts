import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { routes } from './routes';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';

export const Post = () => {
  const params = useParams();
  const { postId } = params;
  const postById = useSelector((state) => state.posts.find((post) => post.id === postId));

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
                <span className="small postPreview__meta-item"> Created: {<TimeAgo timestamp={postById.date} />} </span>
              </div>
            </div>
            <div className="postBody">
              <div className="postContent">{postById.content}</div>

              <ReactionButtons post={postById} />
            </div>
            <div className="postFooter">
              <Link to={routes.postEdit(postById.id)} className="button">
                Edit post
              </Link>
              <Link to={routes.home} className="link">
                [ Back to posts ]
              </Link>
            </div>
          </article>
        ) : (
          <h2 className="h2"> Post not found! </h2>
        )}
      </div>
    </section>
  );
};
