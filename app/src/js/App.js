import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { routes } from './common/routes';

import { PostEditForm } from './features/posts/PostEditForm';
import { Navigation } from './components/Navigation';
import { UsersList } from './features/users/UsersList';
import { NotFound } from './pages/NotFound';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Post } from './features/posts/Post';
import { User } from './features/users/User';

export const App = () => (
  <div className="app">
    <header className="header">
      <Navigation />
    </header>

    <main className="main">
      <Routes>
        <Route index element={<Home />} />
        <Route exact path={routes.user()} element={<User />} />
        <Route path={routes.about} element={<About />} />
        <Route path={routes.users} element={<UsersList />} />
        <Route path={routes.notFound} element={<NotFound />} />
        <Route exact path={routes.post()} element={<Post />} />
        <Route exact path={routes.postEdit()} element={<PostEditForm />} />
      </Routes>
    </main>
    <footer className="footer"></footer>
  </div>
);
