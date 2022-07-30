import React from 'react';
import { useSelector } from 'react-redux';

const RenderPosts = ({ posts }) =>
  posts.map((post) => (
    <article key={post.id} className="postPreview">
      <div className="postPreview__header">
        <h3 className="h3 postPreviews__title">{post.title}</h3>
      </div>

      <div className="postPreview__body">
        <div className="postPreview__excerpt">{post.content}</div>
      </div>
      <div className="postPreview__footer"></div>
    </article>
  ));

export const Posts = () => {
  const postsList = useSelector((state) => state.posts);

  console.log(postsList);

  return (
    <section className="posts">
      <RenderPosts posts={postsList} />
    </section>
  );
};
