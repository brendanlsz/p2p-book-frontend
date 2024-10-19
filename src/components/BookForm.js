import React, { useState } from 'react';
import { createBook } from '../api/api';

function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [condition, setCondition] = useState('');
  const [coverImage, setCoverImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const book = { title, author, description, location, condition, coverImage };
      await createBook(book);
      alert('Book created successfully!');
    } catch (error) {
      alert('Error creating book.');
    }
  };

  return (
    <div>
      <h2>Create Book Listing</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
        <input type="text" value={condition} onChange={(e) => setCondition(e.target.value)} placeholder="Condition" />
        <input type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="Cover Image URL" />
        <button type="submit">Create Book</button>
      </form>
    </div>
  );
}

export default BookForm;
