import React, { useState, useEffect } from "react";
import { getIncomingRequests, acceptRequest, rejectRequest } from "../api/api";
import { Box, Typography, Button, Grid, Snackbar } from "@mui/material";

function IncomingRequests() {
  const [requests, setRequests] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const pollingInterval = 5000; // Polling interval in milliseconds (e.g., 5 seconds)

  useEffect(() => {
    // Function to fetch incoming borrow requests
    const fetchRequests = async () => {
      try {
        const response = await getIncomingRequests();
        setRequests(response.data);
      } catch (err) {
        console.error("Failed to fetch incoming requests", err);
      }
    };

    // Initial fetch
    fetchRequests();

    // Polling for updates every `pollingInterval` milliseconds
    const intervalId = setInterval(fetchRequests, pollingInterval);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Function to handle accepting a request
  const handleAccept = async (requestId) => {
    try {
      await acceptRequest(requestId);
      setSnackbarMessage("Request accepted!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to accept request", error);
      setSnackbarMessage("Failed to accept request.");
      setSnackbarOpen(true);
    }
  };

  // Function to handle rejecting a request
  const handleReject = async (requestId) => {
    try {
      await rejectRequest(requestId);
      setSnackbarMessage("Request rejected!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to reject request", error);
      setSnackbarMessage("Failed to reject request.");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        padding: 3,
        margin: '32px',
        border: '1px solid #ccc',
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h5" gutterBottom align="center" sx={{ fontSize: '1.5rem' }}>
        Incoming Borrow Requests
      </Typography>
      {requests.length === 0 ? ( // Conditional rendering for empty state
        <Typography variant="body1" align="center" sx={{ color: 'text.secondary', padding: 2 }}>
          No incoming requests at this time.
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
                <Typography color="textSecondary">Requester: {request.requesterId}</Typography>
                <Typography color="textSecondary">Status: {request.status}</Typography>
                {request.status === "Pending" && (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAccept(request.id)}
                      sx={{ marginTop: 1, marginRight: 1 }} // Spacing between buttons
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleReject(request.id)}
                      sx={{ marginTop: 1 }} // Spacing for the reject button
                    >
                      Reject
                    </Button>
                  </>
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

export default IncomingRequests;
