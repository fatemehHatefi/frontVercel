'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MovieDetail.module.css';

export default function MovieDetails() {
  const params = useParams();
  const { id } = params;
  const [user, setUser] = useState(null);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(localStorage.getItem('userEmail'));
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMovie = async (id) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://backrender-pzkd.onrender.com/movies/${id}`);
        if (response.status === 200) {
          setMovie(response.data);

          const fetchedUserId = localStorage.getItem('userEmail');
          if (fetchedUserId) {
            await fetch('https://backrender-pzkd.onrender.com/history', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
              body: JSON.stringify({
                userEmail: fetchedUserId,
                movieId: id
              })
            });
          }
        } else {
          throw new Error('Movie not found');
        }
      } catch (error) {
        console.error('Fetch error:', error.response ? error.response.data : error.message);
        setError('Error fetching movie');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovie(id);
    } else {
      setError('No movie ID in query');
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://backrender-pzkd.onrender.com/user?email=${encodeURIComponent(email)}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        const userData = await response.json();
        localStorage.setItem('userName', userData.username);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (email) {
      fetchUser();
    }
  }, [email]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>No movie found</div>;

  const handleAddToWatchlist = async (movieId) => {
    if (!user) {
      setErrorMessage('You need to log in first to add movies to your watchlist.');
      setTimeout(() => {
        router.push('/login');
      }, 3000);
      return;
    }

    try {
      const response = await fetch('https://backrender-pzkd.onrender.com/api/wishlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ userId: user._id, movieId })
      });

      if (response.ok) {
        setUser(prevUser => ({
          ...prevUser,
          wishlist: [...prevUser.wishlist, movieId]
        }));
      } else {
        console.error('Error adding movie to watchlist');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRemoveFromWatchlist = async (movieId) => {
    try {
      const response = await fetch('https://backrender-pzkd.onrender.com/api/wishlist/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ userId: user._id, movieId })
      });

      if (response.ok) {
        setUser(prevUser => ({
          ...prevUser,
          wishlist: prevUser.wishlist.filter(id => id !== movieId)
        }));
      } else {
        console.error('Error removing movie from watchlist');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const isInWatchlist = user?.wishlist.includes(movie._id);

  return (
    <div className={styles.movieDetail}>
      <div className={styles.movieContent}>
        {movie.image && <img src={movie.image} alt={movie.title} className={styles.movieImage} />}
        <div className={styles.movieDescription}>
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
          <p><strong>Release Year:</strong> {movie.releaseYear}</p>
          <p><strong>Rating:</strong> {movie.rating}</p>
          <p>{movie.summary}</p>
          {isInWatchlist ? (
            <button className="btn btn-danger" onClick={() => handleRemoveFromWatchlist(movie._id)}>Remove from Watchlist</button>
          ) : (
            <button className="btn btn-primary" onClick={() => handleAddToWatchlist(movie._id)}>Add to Watchlist</button>
          )}
        </div>
      </div>
    </div>
  );
}
