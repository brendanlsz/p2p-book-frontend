import React, { useState, useEffect } from 'react';
import { createBorrowRequest, getMyRequests } from '../api/api';
import { TextField, Button, Typography, Box } from '@mui/material';

function BorrowRequest() {
  const [bookId, setBookId] = useState('');
  const pollingInterval = 5000; // Polling interval in milliseconds

  // Fetch existing borrow requests (if needed)
  const fetchRequests = async () => {
    try {
      await getMyRequests(); // Replace with your actual API call
      // Handle requests if necessary
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBorrowRequest(bookId);
      alert('Borrow request sent!');
      setBookId(''); // Clear input field after submission
      fetchRequests(); // Refresh requests after submission if needed
    } catch (error) {
      alert('Error sending request.');
    }
  };

  useEffect(() => {
    fetchRequests(); // Initial fetch if needed
    const intervalId = setInterval(fetchRequests, pollingInterval); // Polling for updates
    return () => clearInterval(intervalId); // Cleanup
  }, []);

  return (
    <Box
      sx={{
        padding: 2, // Padding inside the outer box
        margin: 2, // Margin outside the tile for spacing
      }}
    >
      <Box
        sx={{
          padding: 2, // Reduced padding for the inner box to decrease height
          border: '1px solid #ccc', // Subtle border matching BookForm
          borderRadius: 2,
          boxShadow: 3, // Slightly deeper shadow for tile effect
          backgroundColor: '#f9f9f9', // Lighter background for the tile
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center content
        }}
      >
        <Typography variant="h5" gutterBottom> {/* Reduced title size */}
          Borrow Book
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            placeholder="Book ID"
            label="Book ID"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 1 }} // Reduced margin top for the button
          >
            Request to Borrow
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default BorrowRequest;
