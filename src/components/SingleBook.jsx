import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function SingleBook({ token }) {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  useEffect(() => {
    const fetchSingleBook = async () => {
      try {
        const response = await axios.get(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`);
        setBook(response.data.book);
        console.log(response.data.book)
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchSingleBook();
  }, [id]);

  const handleCheckout = async () => {
    try {
      const response = await axios.patch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`,
        {
          available: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('Book checked out successfully!');
        setCheckoutSuccess(true);
      } else {
        console.error('Error during book checkout.');
      }
    } catch (error) {
      console.error('Error during book checkout:', error);
    }
  };

  return (
    <div className='single-book-container'>
      <h2>Book Details</h2>
      <p>Title: {book.title}</p>
      <p>Author: {book.author}</p>
      <img src={book.coverimage} />
      <p>Description: {book.description}</p>
      <button onClick={handleCheckout} disabled={!token}>Checkout</button>
      {checkoutSuccess && <p>Checkout successful! Thank you for borrowing this book.</p>}
    </div>
  );
};

