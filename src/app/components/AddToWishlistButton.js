/*****************************************************************************
*
WEB422 – Project
*
I declare that this assignment is my own work in accordance with SenecaAcademic Policy.
*
No part of this assignment has been copied manually or electronically from any other source
*
(including web sites) or distributed to other students.
*
*
Group member Names: Fatemeh Hatefi, Dhruv Sahni 
Student IDs: 142616218, 143525228 
Date: 08/13/2024
*****************************************************************************/
// src/app/components/AddToWishlistButton.js
'use client';

import { useState } from 'react';

const AddToWishlistButton = ({ movieId }) => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleAddToWishlist = async () => {
    setLoading(true);
    try {
      if (typeof window !== 'undefined') {
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId);
      }

      if (!userId) throw new Error('User not logged in');

      await fetch('https://backrender-pzkd.onrender.com/api/wishlist/add', {
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
