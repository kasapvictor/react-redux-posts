import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectAllPosts, selectAllUsers } from '../../store';
import { routes } from '../../common/routes';

export const UsersList = () => {
  const users = useSelector(selectAllUsers);
  const posts = useSelector(selectAllPosts);
  const postsUsersIds = posts.map((post) => post.userId);
  const filteredUsers = users.filter((user) => postsUsersIds.includes(user.id));

  const renderUsers = filteredUsers.map((user) => (
    <li key={user.id} className="usersList__item">
      <Link to={routes.user(user.id)} className="usersList__link link">
        {user.firstName} {user.lastName} – ID: {user.id}
      </Link>
    </li>
  ));

  return (
    <div className="container">
      <div className="pageHeader">
        <h1 className="h1">Users List</h1>
      </div>

      <ul className="usersList">{renderUsers}</ul>
    </div>
  );
};
