import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Books ({ token }){
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/');
        setBooks(response.data.books);
        console.log(response.data.books)
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return <>
  <h2>Books Catalog</h2>
  <ul className='books-container'>
    {
      books.length ?
        books.map(book => {
          return <li key={book.id}>
            <Link to={`/books/${book.id}`}>
            <h4>{book.title}</h4>
            <img src={book.coverimage} />
            <h4>{book.author}</h4>
            </Link>
          </li>
        })
        :
        <h2>Loading ...</h2>
    }
  </ul>
  </>
}

 
