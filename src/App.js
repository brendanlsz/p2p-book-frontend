import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import BookForm from './components/BookForm';
import BorrowRequest from './components/BorrowRequest';
import IncomingRequests from './components/IncomingRequests';
import BooksList from './components/BooksList'; // Import the new component
import MyRequests from './components/MyRequests'; // Import the new component


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
          <p>Welcome back {localStorage.getItem('email')}</p>
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
