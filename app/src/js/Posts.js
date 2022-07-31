import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const RenderPosts = ({ posts }) =>
  posts.map((post) => (
    <article key={post.id} className="postPreview">
      <div className="postPreview__header">
        <h3 className="h3 postPreview__title">{post.title}</h3>
        <span className="small postPreview__id"> Post ID: {post.id}</span>
      </div>

      <div className="postPreview__body">
        <div className="postPreview__excerpt">{post.content.substring(0, 100)}...</div>
      </div>
      <div className="postPreview__footer">
        <Link to={`/posts/${post.id}`} className="button">
          Read post
        </Link>
      </div>
    </article>
  ));

export const Posts = () => {
  const postsList = useSelector((state) => state.posts);

  return (
    <section className="postsPreview">
      <RenderPosts posts={postsList} />
    </section>
  );
};
