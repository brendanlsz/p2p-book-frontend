import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const pollingInterval = 5000;

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/books', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });
      setBooks(response.data);
    } catch (err) {
      setError('Failed to fetch books');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();

    const intervalId = setInterval(() => {
      fetchBooks();
    }, pollingInterval);

    return () => clearInterval(intervalId);
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Books List</h2>
      <div style={styles.bookListContainer}>
        {books.map((book) => (
          <div key={book.id} style={styles.bookTile}>
            <img src={book.coverImage} alt={book.title} style={styles.coverImage} />
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Location: {book.location}</p>
            <p>Condition: {book.condition}</p>
            <p>id: {book.id}</p>
            <p>status: {book.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  bookListContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Align from the left
    gap: '20px',
  },
  bookTile: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    width: '200px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease-in-out',
  },
  coverImage: {
    width: '100px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
};

export default BooksList;
