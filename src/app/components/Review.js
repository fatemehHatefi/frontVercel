import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ userEmail, movieId }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://backrender-pzkd.onrender.com/api/reviews', {
        userEmail,
        movieId,
        rating,
        comment,
        date: new Date().toISOString(), // Include current date
      });

      setMessage(response.data.message);
      setRating('');
      setComment('');
    } catch (err) {
      console.error('Error submitting review:', err);
      setMessage('Error submitting review');
    }
  };

  return (
    <div>
      <h3>Submit a Review</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            required
          />
        </div>
        <div>
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ReviewForm;
