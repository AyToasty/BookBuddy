import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Books from './components/Books';
import SingleBook from './components/SingleBook';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';
import Navigations from './components/Navigations';

function App() {
  // const [token, setToken] = useState(null);
  
  return (
    <Router>
      <div className="App">
        <Navigations />
        <Routes>
          <Route path="/books/:id" element={<SingleBook />}></Route>
          <Route path="/books" element={<Books />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/account" element={<Account />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
