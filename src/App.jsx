import React,{ useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Books from './components/Books';
import SingleBook from './components/SingleBook';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';
import Navigations from './components/Navigations';
import bookLogo from './assets/books.png'

export default function App() {
  const [token, setToken] = useState(null);
  
  return (
    <Router>
      <>
        <div className="header-container">
          <h1 className='heading'>
            <img id="logo-image" src={bookLogo} alt="Book Logo" />
            Book Buddy
          </h1>

          <Navigations token={token} />
        </div>

        <Routes>
          <Route path="/books/:id" element={<SingleBook token={token} />} />
          <Route path="/books" element={<Books token={token} />} />
          <Route path="/account" element={<Account token={token} setToken={setToken}/>} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </>
    </Router>
  );
}