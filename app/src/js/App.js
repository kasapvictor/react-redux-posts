import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { routes } from './routes';

import { Navigation } from './Navigation';
import { NotFound } from './NotFound';
import { About } from './About';
import { Home } from './Home';
import { Post } from './Post';
import { PostEditForm } from './PostEditForm';

export const App = () => (
  <div className="app">
    <header className="header">
      <Navigation />
    </header>

    <main className="main">
      <Routes>
        <Route index element={<Home />} />
        <Route path={routes.about} element={<About />} />
        <Route exact path={routes.post()} element={<Post />} />
        <Route exact path={routes.postEdit()} element={<PostEditForm />} />
        <Route path={routes.notFound} element={<NotFound />} />
      </Routes>
    </main>
  </div>
);
