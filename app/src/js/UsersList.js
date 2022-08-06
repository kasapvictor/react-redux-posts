import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectAllUsers } from './store';
import { routes } from './routes';

export const UsersList = () => {
  const users = useSelector(selectAllUsers);

  console.log(users);

  const renderUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={routes.user(user.id)}>
        {user.firstName} {user.lastName}
      </Link>
    </li>
  ));

  return (
    <div className="container">
      <div className="pageHeader">
        <h1 className="h1">Users List</h1>
      </div>

      <div className="usersList">{renderUsers}</div>
    </div>
  );
};
