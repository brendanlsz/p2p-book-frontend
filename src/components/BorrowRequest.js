import React, { useState, useEffect } from 'react';
import { createBorrowRequest, getMyRequests, returnBook } from '../api/api'; // Ensure returnBook is imported

function BorrowRequest() {
  const [bookId, setBookId] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBorrowRequest(bookId);
      alert('Borrow request sent!');
      setBookId(''); // Clear input field after submission
      fetchRequests(); // Refresh requests after submission
    } catch (error) {
      alert('Error sending request.');
    }
  };

  useEffect(() => {
    fetchRequests(); // Initial fetch
    const intervalId = setInterval(fetchRequests, pollingInterval); // Polling for updates
    return () => clearInterval(intervalId); // Cleanup
  }, []);

  return (
    <div>
      <h2>Borrow Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          placeholder="Book ID"
        />
        <button type="submit">Request to Borrow</button>
      </form>
    </div>
  );
}

export default BorrowRequest;
