import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { selectUserById, selectAllPosts } from './store';
import { routes } from './routes';

export const User = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, +userId));
  const userPosts = useSelector((state) => {
    const posts = selectAllPosts(state);
    return posts.filter((post) => post.userId === user.id);
  });

  console.log('userPosts', userPosts, !!userPosts);

  const renderPosts = userPosts.map((post) => (
    <li key={post.id} className="userPosts__item">
      <Link to={routes.post(post.id)} className="userPosts__link link">
        {post.title}
      </Link>
      <div className="meta">
        <span className="meta__item">Reactions: {post.reactions}</span>
      </div>
    </li>
  ));

  return (
    <div className="container">
      <div className="pageHeader">
        <h1 className="h1">
          {user.firstName} {user.lastName}
        </h1>
        <div className="meta">
          <span className="small meta__item">ID: {user.id}</span>
        </div>
      </div>

      <div className="userPage">
        <div className="userData">
          <div className="userData__left">
            <div className="userData__avatar">
              <img className="userData__img" src={user.image} alt={user.firstName} />
            </div>
          </div>

          <div className="userData__right">
            <p className="userData__item">
              Burn: {user.birthDate}, Age: {user.age}
            </p>
            <p className="userData__item">Phone: {user.phone}</p>
            <p className="userData__item">Email: {user.email}</p>
            <p className="userData__item">
              Address: {user.address.address}, {user.address.city}, ZIP {user.address.zip}
            </p>
          </div>
        </div>
        <div className="userPosts">
          {userPosts.length > 0 ? (
            <>
              <h2 className="h2">Posts:</h2>
              <ul className="userPosts__list">{renderPosts}</ul>
            </>
          ) : (
            <h2 className="h2">No posts</h2>
          )}
        </div>
      </div>
    </div>
  );
};
