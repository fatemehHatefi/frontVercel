'use client';

import React, { useState } from 'react';
import styles from './Review.module.css';

const Review = ({ movieId, userId }) => {
  const [formData, setFormData] = useState({
    movie: movieId,
    rating: '',
    comment: '',
    date: new Date().toISOString(), // Automatically set the current date
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://backrender-pzkd.onrender.com/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token if needed
        },
        body: JSON.stringify({
          userEmail: userId, // Ensure userId is used as userEmail in the request body
          movieId: formData.movie,
          rating: formData.rating,
          comment: formData.comment,
          date: formData.date,
        }),
      });

      if (response.ok) {
        setStatus('Review submitted successfully!');
        setFormData({
          movie: movieId,
          rating: '',
          comment: '',
          date: new Date().toISOString(),
        });
      } else {
        setStatus('Failed to submit review.');
      }
    } catch (error) {
      setStatus('An error occurred.');
    }
  };

  return (
    <div className={styles.reviewContainer}>
      <h1 className={styles.heading}>Submit Your Review</h1>
      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <input
          type="hidden"
          id="movie"
          name="movie"
          value={formData.movie}
        />
        <input
          type="hidden"
          id="date"
          name="date"
          value={formData.date}
        />
        <label htmlFor="rating" className={styles.label}>
          Rating:
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className={styles.input}
            required
            min="1"
            max="5"
          />
        </label>
        <label htmlFor="comment" className={styles.label}>
          Comment:
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className={styles.textarea}
            required
          />
        </label>
        <button type="submit" className={styles.submitButton}>
          Submit Review
        </button>
      </form>
      {status && <p className={styles.status}>{status}</p>}
    </div>
  );
};

export default Review;
