import React, { useState, useEffect } from 'react';
import { getMyRequests, returnBook } from '../api/api'; // Ensure returnBook is imported
import { Box, Typography, Button, Grid, Snackbar } from '@mui/material';

function MyRequests() {
  const [requests, setRequests] = useState([]); // State to hold borrow requests
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const pollingInterval = 5000; // Polling interval in milliseconds

  // Fetch existing borrow requests
  const fetchRequests = async () => {
    try {
      const response = await getMyRequests(); // Replace with your actual API call
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleReturnBook = async (requestId) => {
    try {
      await returnBook(requestId); // Call to return the book
      setSnackbarMessage('Book returned successfully!');
      setSnackbarOpen(true);
      fetchRequests(); // Refresh requests after returning the book
    } catch (error) {
      setSnackbarMessage('Error returning book.');
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchRequests(); // Initial fetch
    const intervalId = setInterval(fetchRequests, pollingInterval); // Polling for updates
    return () => clearInterval(intervalId); // Cleanup
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        padding: 3,
        margin: '32px',
        border: '1px solid #ccc', // Subtle border for the section tile
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: '#f9f9f9', // Lighter background for the section
      }}
    >
      <Typography variant="h5" gutterBottom align="center" sx={{ fontSize: '1.5rem' }}>
        Your Borrow Requests
      </Typography>
      {requests.length === 0 ? ( // Conditional rendering for empty state
        <Typography variant="body1" align="center" sx={{ color: 'text.secondary', padding: 2 }}>
          No borrow requests at this time.
        </Typography>
      ) : (
        <Grid container spacing={2} justifyContent="flex-start">
          {requests.map((request) => (
            <Grid item key={request.id} xs={12} sm={6} md={4} lg={3}>
              <Box
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  padding: 2,
                  textAlign: 'center',
                  boxShadow: 3,
                  transition: 'transform 0.2s ease-in-out',
                  backgroundColor: '#fff', // White background for individual tiles
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                }}
              >
                <Typography variant="h6">Book ID: {request.bookId}</Typography>
                <Typography color="textSecondary">Status: {request.status}</Typography>
                {request.status === 'Accepted' && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleReturnBook(request.id)}
                    sx={{ marginTop: 1 }}
                  >
                    Return Book
                  </Button>
                )}
              </Box>
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
    </Box>
  );
}

export default MyRequests;
