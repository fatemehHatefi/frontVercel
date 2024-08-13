//src/app/api/search/page.js
"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MovieDetails.module.css'; // Optional: create a CSS module for styling

export default function MovieDetails() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async (query) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/movies?query=${query}`);
        setMovies(response.data);
      } catch (error) {
        setError('Error fetching movies');
      } finally {
        setLoading(false);
      }
    };

    const query = router.query.query; 

    if (query) {
      fetchMovies(query);
    } else {
      setError('No search query provided');
      setLoading(false);
    }
  }, [router.query]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movies.length) return <div>No movies found</div>;

  return (
    <div className={styles.container}>
      <h1>Search Results</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
