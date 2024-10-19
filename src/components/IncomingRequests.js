import React, { useState, useEffect } from "react";
import { getIncomingRequests, acceptRequest, rejectRequest } from "../api/api";

function IncomingRequests() {
  const [requests, setRequests] = useState([]);
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
      alert("Request accepted!");
    } catch (error) {
      console.error("Failed to accept request", error);
      alert("Failed to accept request.");
    }
  };

  // Function to handle rejecting a request
  const handleReject = async (requestId) => {
    try {
      await rejectRequest(requestId);
      alert("Request rejected!");
    } catch (error) {
      console.error("Failed to reject request", error);
      alert("Failed to reject request.");
    }
  };

  return (
    <div>
      <h2>Incoming Borrow Requests</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start", // Align from the left
          gap: "20px",
        }}
      >
        {requests.map((request) => (
          <div
            key={request.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "18px",
              padding: "10px",
              width: "200px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease-in-out",
            }}
          >
            <p>Book ID: {request.bookId}</p>
            <p>Requester: {request.requesterId}</p>
            <p>Status: {request.status}</p>
            {request.status === "Pending" && (
              <>
                <button onClick={() => handleAccept(request.id)}>Accept</button>
                <button onClick={() => handleReject(request.id)}>Reject</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default IncomingRequests;
