import React from 'react';

// DOCS: https://dummyjson.com/docs/posts
// DATA: https://dummyjson.com/posts

import { Posts } from './Posts';
import { PostAddForm } from './PostAddForm';

export const Home = () => (
  <div className="container">
    <div className="pageHeader">
      <h1 className="h1">Posts list</h1>
    </div>

    <PostAddForm />

    <Posts />
  </div>
);
