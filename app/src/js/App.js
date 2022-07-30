import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const NotFound = () => <>Not Found</>;

function Home() {
  return <h1 className="h1">Home</h1>;
}

function About() {
  return <h1 className="h1">About</h1>;
}

export const App = () => (
  <div className="App">
    <h1>Welcome to React Router!</h1>

    <ul>
      <li>
        <Link to="/">[Home]</Link>
      </li>
      <li>
        <Link to="/about">[About]</Link>
      </li>
    </ul>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
);
