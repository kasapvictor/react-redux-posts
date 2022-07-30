import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { routes } from './routes';

import { Navigation } from './Navigation';
import { NotFound } from './NotFound';
import { Home } from './Home';
import { Post } from './Post';

export const App = () => (
  <div className="app">
    <header className="header">
      <Navigation />
    </header>

    <div className="main">
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.post} element={<Post />} />
        <Route path={routes.notFound} element={<NotFound />} />
      </Routes>
    </div>
  </div>
);
