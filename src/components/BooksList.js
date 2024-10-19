import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createBorrowRequest } from '../api/api';
import { Box, Card, CardContent, CardMedia, Typography, Button, Grid, Snackbar } from '@mui/material';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
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

  const handleBorrowRequest = async (bookId) => {
    try {
      await createBorrowRequest(bookId);
      setSnackbarMessage('Borrow request submitted successfully!');
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Failed to request borrow', err);
      setSnackbarMessage('Failed to submit borrow request.');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: 2, margin: 2 }}>
      <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Books List
        </Typography>

        {books.length === 0 ? ( // Check if books array is empty
          <Typography variant="h6" align="center" color="textSecondary">
            No books available at the moment.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {books.map((book) => (
              <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 2,
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': { transform: 'scale(1.03)' },
                    height: '100%',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="150"
                    image={book.coverImage}
                    alt={book.title}
                    sx={{ borderRadius: '8px 8px 0 0' }}
                  />
                  <CardContent>
                    <Typography variant="h6">{book.title}</Typography>
                    <Typography color="textSecondary">Author: {book.author}</Typography>
                    <Typography color="textSecondary">Location: {book.location}</Typography>
                    <Typography color="textSecondary">Condition: {book.condition}</Typography>
                    <Typography color="textSecondary">ID: {book.id}</Typography>
                    <Typography color="textSecondary">Status: {book.status}</Typography>
                    {book.ownerId !== localStorage.getItem('email') && book.status === 'available' && (
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => handleBorrowRequest(book.id)}
                        sx={{ marginTop: 1 }}
                      >
                        Request to Borrow
                      </Button>
                    )}
                    {book.ownerId === localStorage.getItem('email') && (
                      <Typography variant="body2" color="primary" sx={{ marginTop: 1 }}>
                        My Listing
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </Card>
    </Box>
  );
};

export default BooksList;
