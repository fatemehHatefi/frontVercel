'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './watchlist.module.css'; // Import custom styles

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [user, setUser] = useState(null);
  let email = null;

  if (typeof window !== 'undefined') {
    email = localStorage.getItem('userEmail');
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://backrender-pzkd.onrender.com/user?email=${encodeURIComponent(email)}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Use consistent token handling
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        const userData = await response.json();
        setUser(userData);

        // Fetch user's watchlist movies
        const watchlistResponse = await fetch(`https://backrender-pzkd.onrender.com/api/wishlist/view?email=${encodeURIComponent(email)}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Use consistent token handling
          }
        });

        if (!watchlistResponse.ok) {
          throw new Error('Failed to fetch watchlist');
        }

        const watchlistData = await watchlistResponse.json();
        setWatchlist(watchlistData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (email) {
      fetchUser();
    }
  }, [email]);

  const handleRemoveFromWatchlist = async (userId, movieId) => {
    try {
      const response = await fetch('https://backrender-pzkd.onrender.com/api/wishlist/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add auth token if using JWT
        },
        body: JSON.stringify({ userId, movieId })
      });

      if (response.ok) {
        console.log('Movie removed from watchlist');
        // Update watchlist state to remove the movie
        setWatchlist(prevWatchlist => prevWatchlist.filter(movie => movie._id !== movieId));
      } else {
        console.error('Error removing movie from watchlist');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.movieList}>
      {watchlist.length > 0 ? (
        watchlist.map(movie => (
          <div key={movie._id} className="card movie-item" style={{ width: '18rem' }}>
            {movie.image && (
              <Link href={`/movie/${movie._id}`}>
 <Image
  src={movie.image}
  className="card-img-top"
  alt={movie.title}
  width={800}  // Adjust width as needed
  height={400} // Adjust height as needed
/>
              </Link>
            )}
            <div className="card-body">
              <Link href={`/movie/${movie._id}`} passHref>
                <h5 className="card-title" style={{ cursor: 'pointer' }}>
                  {movie.title} {movie.discontinued && <span>(Discontinued)</span>}
                </h5>
              </Link>
              <p className="card-text">
                {movie.description || 'No description available'} <br />
                Rating: {movie.rating || 'N/A'} <br />
                Release Year: {movie.releaseYear || 'N/A'}
              </p>
              {user && (
                <button className="btn btn-danger" onClick={() => handleRemoveFromWatchlist(user._id, movie._id)}>
                  Remove from Watchlist
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>Your watchlist is empty.</p>
      )}
    </div>
  );
};

export default Watchlist;
