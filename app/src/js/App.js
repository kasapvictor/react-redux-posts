import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { routes } from './routes';

import { PostEditForm } from './PostEditForm';
import { Navigation } from './Navigation';
import { UsersList } from './UsersList';
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
        <Route exact path={routes.post()} element={<Post />} />
        <Route exact path={routes.postEdit()} element={<PostEditForm />} />
        <Route path={routes.users} element={<UsersList />} />
        <Route path={routes.notFound} element={<NotFound />} />
      </Routes>
    </main>
    <footer className="footer"></footer>
  </div>
);
