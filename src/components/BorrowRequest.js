import React, { useState } from 'react';
import { createBorrowRequest } from '../api/api';

function BorrowRequest() {
  const [bookId, setBookId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBorrowRequest(bookId);
      alert('Borrow request sent!');
    } catch (error) {
      alert('Error sending request.');
    }
  };

  return (
    <div>
      <h2>Borrow Book</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={bookId} onChange={(e) => setBookId(e.target.value)} placeholder="Book ID" />
        <button type="submit">Request to Borrow</button>
      </form>
    </div>
  );
}

export default BorrowRequest;
