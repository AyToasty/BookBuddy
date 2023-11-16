import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function Account() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const location = useLocation();


  useEffect(() => {
    const fetchToken = async (event) => {
      try {
        const { state: { email, password } } = location;
        const response = await axios.post('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login', {
          email,
          password,
        });

        if (response.status === 200) {
          setToken(response.data.token);
        } else {
          console.error('Error fetching token.');
        }
      } catch (error) {
        console.error('Error during token fetch:', error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.error('Error fetching user data.');
        }
      } catch (error) {
        console.error('Error during user data fetch:', error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  return (
    <div>
      <h2>Account</h2>
      {user && user.email ? (
        <>
          <p>Email: {user.email}</p>
          <p>First Name: {user.firstname}</p>
          <p>Last Name: {user.lastname}</p>
          <p>Books Checked Out:</p>
          <ul>
            {user.booksCheckedOut &&
              user.booksCheckedOut.map((book, index) => <li key={index}>{book}</li>)}
          </ul>
        </>
      ) : (
        <p>User not logged in. Please login again.</p>
      )}
    </div>
  );
}
