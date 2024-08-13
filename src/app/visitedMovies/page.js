'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './watchlist.module.css'; // Import custom styles

const History = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem('userEmail'); // Retrieve the email from localStorage

  
  useEffect(() => {
    const fetchUserHistory = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://backrender-pzkd.onrender.com/historyView', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ userEmail: email })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }

        const historyData = await response.json();
        console.log('Fetched history data:', historyData); // Log fetched data
        setHistory(historyData);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchUserHistory(); // Call the fetchUserHistory function if email is present
    }
  }, [email]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>History</h2>
      {error && <p className="text-danger">Error: {error}</p>}
      <div className={styles.movieList}>
        {history.length > 0 ? (
          history.map(movie => (
            <div key={movie._id} className="card movie-item" style={{ width: '18rem' }}>
              {movie.image ? (
                <Link href={`/movie/${movie._id}`}>
                  <img src={movie.image} className="card-img-top" alt={movie.title} style={{ height: '400px', objectFit: 'cover', cursor: 'pointer' }} />
                </Link>
              ) : (
                <p>No image available</p>
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
              </div>
            </div>
          ))
        ) : (
          <p>Your history is empty.</p>
        )}
      </div>
    </div>
  );
};

export default History;
