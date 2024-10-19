import React, { useState } from 'react';
import { createBook } from '../api/api';
import { Box, TextField, Button, Typography } from '@mui/material';

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
    <Box
      sx={{
        padding: 2, // Padding inside the outer box
        margin: 2, // Margin outside the tile for spacing
      }}
    >
      <Box
        sx={{
          padding: 2, // Reduced padding to decrease height
          border: '1px solid #ccc', // Subtle border
          borderRadius: 2,
          boxShadow: 3, // Slightly deeper shadow for tile effect
          backgroundColor: '#f9f9f9', // Lighter background for the tile
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center content
        }}
      >
        <Typography variant="h5" gutterBottom> {/* Reduced title size */}
          Create Book Listing
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            label="Title"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            label="Author"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            label="Description"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            label="Location"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            placeholder="Condition"
            label="Condition"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="Cover Image URL"
            label="Cover Image URL"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 1 }} // Reduced margin top for the button
          >
            Create Book
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default BookForm;
