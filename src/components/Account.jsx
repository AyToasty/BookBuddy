// Account.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Account({ token,setToken }) {
  const [user, setUser] = useState({});
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUser(response.data);
        fetchCheckedOutBooks();
        setIsLoggedIn(true);
      } else {
        console.error('Error fetching user data.');
      }
    } catch (error) {
      console.error('Error during user data fetch:', error);
      setIsLoggedIn(false); 
    }
  };

  const fetchCheckedOutBooks = async () => {
    try {
      const response = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Checked-out books response:', response.data);

      if (response.status === 200) {
        setCheckedOutBooks(response.data.reservation);
      } else {
        console.error('Error fetching checked-out books.');
      }
    } catch (error) {
      console.error('Error during checked-out books fetch:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const handleReturnBook = async (reservationId) => {
    try {
      const response = await axios.delete(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Book returned successfully!');
        fetchUserData();
        fetchCheckedOutBooks();
      } else {
        console.error('Error during book return.');
      }
    } catch (error) {
      console.error('Error during book return:', error);
    }
  };

  const handleLogout = () => {
    setUser({});
    setToken(null)
    setIsLoggedIn(false);
  };

  return (
    <div className='account'>
      {isLoggedIn ? ( 
        <>
          <h2>Account Details</h2>
          <p>Email: {user.email}</p>
          <p>First Name: {user.firstname}</p>
          <p>Last Name: {user.lastname}</p>
          <button onClick={handleLogout}>Logout</button>

          <h3>Checked Out Books</h3>
          {checkedOutBooks.length > 0 ? (
            <ul>
              {checkedOutBooks.map((book) => (
                <li key={book.id}>
                  {book.title} by {book.author}{' '}
                  <button onClick={() => handleReturnBook(book.id)}>Return</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No books checked out.</p>
          )}
           
        </>
      ) : (
        <p>Not logged in. Please log in.</p>
      )}
    </div>
  );
}
