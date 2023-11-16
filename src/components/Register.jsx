import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Register({setToken}) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate()

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const { data: response } = await axios.post('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register', {
        firstname,
        lastname,
        email,
        password,
      });

      console.log(response)

      if (response.success) {
        setSuccessMessage("Signup successful!");
        setToken(response.token);
      } else {
        setError(response.message || 'Registration Failed');
      }
      navigate('/login')
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p className='error'>{error}</p>}
      {successMessage && <p className='success'>{successMessage}</p>}
      <form>
        <label>
          First Name:
          <input 
          type="text" 
          value={firstname} 
          onChange={(e) => setFirstname(e.target.value)} />
        </label>
        <br />
        <label>
          Last Name:
          <input 
          type="text" 
          value={lastname} 
          onChange={(e) => setLastname(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input 
          type="text" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};
