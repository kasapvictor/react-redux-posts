import React from 'react';

// https://dummyjson.com/posts
// https://jsonplaceholder.typicode.com/posts

import { Posts } from './Posts';
import { AddPostForm } from './AddPostForm';

export const Home = () => (
  <div className="container">
    <div className="pageHeader">
      <h1 className="h1">Posts list</h1>
    </div>

    <AddPostForm />

    <Posts />
  </div>
);
