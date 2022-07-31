import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { routes } from './routes';

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
              <span className="small postPreview__id"> Post ID: {postById.id}</span>
            </div>
            <div className="postBody">
              <div className="postContent">{postById.content}</div>
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
