import React from 'react';
import { NavLink } from 'react-router-dom';

import { routes } from '../common/routes';

export const Navigation = () => (
  <div className="container">
    <nav className="navigation">
      <ul className="navigation__inner">
        <li className="navigation__item">
          <NavLink to={routes.home} className="navigation__link" end>
            [ Home ]
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink to={routes.users} className="navigation__link" end>
            [ Users ]
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink to={routes.about} className="navigation__link" end>
            [ About ]
          </NavLink>
        </li>
      </ul>
    </nav>
  </div>
);
