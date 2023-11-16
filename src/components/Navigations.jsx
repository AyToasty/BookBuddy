import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigations() {
  return (
    <nav>
      <ul className='navbar'>
        <li>
          <Link to="/books">Books</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/account">Account</Link>
        </li>
      </ul>
    </nav>
  );
};
