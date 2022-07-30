import React from 'react';
import { Link } from 'react-router-dom';

import { routes } from './routes';

export const Navigation = () => (
  <div className="container">
    <nav className="navigation">
      <ul className="navigation__inner">
        <li className="navigation__item">
          <Link to={routes.home} className="navigation__link">
            [ Home ]
          </Link>
        </li>
      </ul>
    </nav>
  </div>
);
