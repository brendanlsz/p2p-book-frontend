import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import BookForm from './components/BookForm';
import BorrowRequest from './components/BorrowRequest';
import IncomingRequests from './components/IncomingRequests';
import BooksList from './components/BooksList'; // Import the new component
import MyRequests from './components/MyRequests'; // Import the new component
import { Box, Typography } from '@mui/material';

const WelcomeMessage = () => {
  const email = localStorage.getItem('email');

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: 1,
        backgroundColor: '#e0f7fa', // Light cyan background
        boxShadow: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#00796b' }}>
        Welcome back,
      </Typography>
      <Typography variant="h6" sx={{ color: '#004d40' }}>
        {email}
      </Typography>
    </Box>
  );
};


// Check if the user is logged in (token exists in localStorage)
const isLoggedIn = () => !!localStorage.getItem('token');

function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn()); // Store login state

  // This effect will run when the component mounts and when the token changes
  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  // This function will be passed down to the Login component
  // It will update the login state when the user logs in
  const handleLoginSuccess = () => {
    setLoggedIn(true); // Set the state to logged in when the login is successful
  };

  return (
    <div className="App">
      <h1>Book Exchange App</h1>
      {!loggedIn && <Login onLoginSuccess={handleLoginSuccess} />}
      {loggedIn && (
        <>
          <WelcomeMessage />
          <BooksList />
          <BookForm />
          <BorrowRequest />
          <MyRequests />
          <IncomingRequests />
        </>
      )}
    </div>
  );
}

export default App;
