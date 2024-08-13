'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Use useSearchParams to access query parameters
import styles from './SearchResults.module.css'; // Import the updated CSS

const MovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null); // Add user state
  const router = useRouter();
  const searchParams = useSearchParams(); // Access search parameters

  useEffect(() => {
    const query = searchParams.get('query'); // Get the query parameter from the URL
    if (query) {
      setSearchTerm(query); // Update state with the query
      console.log('Fetching movies with query:', query);
      fetch(`https://backrender-pzkd.onrender.com/search?query=${encodeURIComponent(query)}`)
        .then(response => {
          console.log('Response status:', response.status); // Log status
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Data received:', data); // Log the data received
          setMovies(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [searchParams]); // Depend on searchParams to trigger the effect

  useEffect(() => {
    // Fetch user details based on the email
    const fetchUser = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        if (email) {
          const response = await fetch(`https://backrender-pzkd.onrender.com/user?email=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include your auth token if needed
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user');
          }

          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser(); // Call the fetchUser function
  }, []);

  const handleAddToWatchlist = async (userId, movieId) => {
    try {
      console.log("Adding to Watchlist - Request Body:", { userId, movieId });
      const response = await fetch('https://backrender-pzkd.onrender.com/api/wishlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add auth token if using JWT
        },
        body: JSON.stringify({ userId, movieId })
      });

      if (response.ok) {
        console.log('Movie added to watchlist');
        // Update user state to include the new movie
        setUser(prevUser => ({
          ...prevUser,
          wishlist: [...prevUser.wishlist, movieId]
        }));
      } else {
        console.error('Error adding movie to watchlist', await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRemoveFromWatchlist = async (userId, movieId) => {
    try {
      console.log("Removing from Watchlist - Request Body:", { userId, movieId });
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
        // Update user state to remove the movie
        setUser(prevUser => ({
          ...prevUser,
          wishlist: prevUser.wishlist.filter(id => id !== movieId)
        }));
      } else {
        console.error('Error removing movie from watchlist', await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.movieList}>
      {movies.length > 0 ? (
        movies.map(movie => {
          const isInWatchlist = user?.wishlist.includes(movie._id);

          return (
            <div key={movie.id} className="card" style={{ width: '18rem' }}>
              {movie.image && (
                <a href={`/movie/${movie.id}`}>
                  <img 
                    src={movie.image} 
                    className={styles.cardImgTop} 
                    alt={movie.title} 
                    style={{ height: '400px', objectFit: 'cover', cursor: 'pointer' }} 
                  />
                </a>
              )}
              <div className="card-body">
                <a href={`/movie/${movie.id}`} passHref>
                  <h5 className="card-title" style={{ cursor: 'pointer' }}>
                    {movie.title} {movie.discontinued && <span>(Discontinued)</span>}
                  </h5>
                </a>
                <p className="card-text">
                  {movie.description} <br />
                  Rating: {movie.rating} <br />
                  Release Year: {movie.releaseYear}
                </p>
                {isInWatchlist ? (
                  <button className="btn btn-danger" onClick={() => handleRemoveFromWatchlist(user._id, movie._id)}>Remove from Watchlist</button>
                ) : (
                  <button className="btn btn-primary" onClick={() => handleAddToWatchlist(user._id, movie._id)}>Add to Watchlist</button>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
};

export default MovieSearch;
