import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function SingleBook() {
  const { id } = useParams();
  const [book, setBook] = useState({});

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

  return (
    <div className='single-book-container'>
      <h2>Book Details</h2>
      <p>Title: {book.title}</p>
      <p>Author: {book.author}</p>
      <img src={book.coverimage} />
      <p>Description: {book.description}</p>
    </div>
  );
};

