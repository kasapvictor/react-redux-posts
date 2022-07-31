import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { routes } from './routes';

import { Navigation } from './Navigation';
import { NotFound } from './NotFound';
import { About } from './About';
import { Home } from './Home';
import { Post } from './Post';

export const App = () => (
  <div className="app">
    <header className="header">
      <Navigation />
    </header>

    <main className="main">
      <Routes>
        <Route index element={<Home />} />
        <Route path={routes.about} element={<About />} />
        <Route path={routes.post} element={<Post />} />
        <Route path={routes.notFound} element={<NotFound />} />
      </Routes>
    </main>
  </div>
);
