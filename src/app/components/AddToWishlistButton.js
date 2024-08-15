// src/app/components/AddToWishlistButton.js
'use client';

import { useState } from 'react';

const AddToWishlistButton = ({ movieId }) => {
  const [loading, setLoading] = useState(false);

  const handleAddToWishlist = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem('userId'); // Or get from auth state
      if (!userId) throw new Error('User not logged in');

      await fetch('http://localhost:5001/api/wishlist/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, movieId }),
      });

      alert('Movie added to wishlist');
    } catch (error) {
      console.error('Error adding movie to wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleAddToWishlist} disabled={loading}>
      {loading ? 'Adding...' : 'Add to Wishlist'}
    </button>
  );
};

export default AddToWishlistButton;
