import React, { useState, useEffect } from 'react';
import { getMyRequests } from '../api/api';

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const pollingInterval = 5000; // Polling interval in milliseconds (e.g., 5 seconds)

  useEffect(() => {
    // Function to fetch borrow requests
    const fetchRequests = async () => {
      try {
        const response = await getMyRequests();
        setRequests(response.data);
      } catch (err) {
        console.error('Failed to fetch requests', err);
      }
    };

    // Initial fetch
    fetchRequests();

    // Polling for updates every `pollingInterval` milliseconds
    const intervalId = setInterval(fetchRequests, pollingInterval);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      <h2>My Borrow Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            Book ID: {request.bookId}, Status: {request.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyRequests;
