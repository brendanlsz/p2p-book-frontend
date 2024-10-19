import React, { useState, useEffect } from 'react';
import { getMyRequests, returnBook } from '../api/api'; // Ensure returnBook is imported

function BorrowRequest() {
  const [requests, setRequests] = useState([]); // State to hold borrow requests
  const pollingInterval = 5000; // Polling interval in milliseconds

  // Fetch existing borrow requests
  const fetchRequests = async () => {
    try {
      // Assume you have a function to fetch your requests
      const response = await getMyRequests(); // Replace with your actual API call
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleReturnBook = async (requestId) => {
    try {
      await returnBook(requestId); // Call to return the book
      alert('Book returned successfully!');
      fetchRequests(); // Refresh requests after returning the book
    } catch (error) {
      alert('Error returning book.');
    }
  };

  useEffect(() => {
    fetchRequests(); // Initial fetch
    const intervalId = setInterval(fetchRequests, pollingInterval); // Polling for updates
    return () => clearInterval(intervalId); // Cleanup
  }, []);

  return (
    <div>
      <h2>Your Borrow Requests</h2>
      <div style={styles.requestListContainer}>
        {requests.map((request) => (
          <div key={request.id} style={styles.requestTile}>
            <h3>Book ID: {request.bookId}</h3>
            <p>Status: {request.status}</p>
            {request.status === 'Accepted' && (
              <button onClick={() => handleReturnBook(request.id)}>Return Book</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Inline CSS styles
const styles = {
  requestListContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Align from the left
    gap: '20px',
  },
  requestTile: {
    border: '1px solid #ccc',
    borderRadius: '18px',
    padding: '10px',
    width: '200px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease-in-out',
  },
};

export default BorrowRequest;
