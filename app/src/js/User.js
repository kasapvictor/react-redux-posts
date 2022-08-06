import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectUserById } from './store';

export const User = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, +userId));

  console.log('user', user);

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
      </div>
    </div>
  );
};
