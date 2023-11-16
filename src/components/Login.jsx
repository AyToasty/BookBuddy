import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setError('');
      const response = await axios.post('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login', {
        email,
        password,
      });

      if (response.data.token) {
        console.log('Login successful!');
        setToken(response.data.token)
        navigate('/account',{state:{email,password}})
      } else {
        setError('Invalid email or password.');
      }

    } catch (error) {
      setError('An error occurred during login. Please try again.');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='login'>
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form>
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};
