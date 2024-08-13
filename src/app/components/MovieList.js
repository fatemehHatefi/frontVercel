'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Alert } from 'react-bootstrap'; // Import Alert component
import styles from './MovieList.module.css';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [email, setEmail] = useState(localStorage.getItem('userEmail'));
  const [errorMessage, setErrorMessage] = useState(''); // State to store the error message
  const router = useRouter();
  let userId = null;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://backrender-pzkd.onrender.com/movies?page=${currentPage}&limit=4`);
        const data = await response.json();
        setMovies(data.movies);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();
  }, [currentPage]);

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

  if (user) {
    userId = user._id;
  }

  const handleAddToWatchlist = async (movieId) => {
    if (!user) {
      setErrorMessage('You need to log in first to add movies to your watchlist.'); // Set error message
      
      setTimeout(() => {
        router.push('/login');
      }, 3000); // Delay of 3 seconds
  
      return;
    }
  
    try {
      const response = await fetch('https://backrender-pzkd.onrender.com/api/wishlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ userId, movieId })
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
        body: JSON.stringify({ userId, movieId })
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className={styles.movieList}>
      {/* Display the error message if it exists */}
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
          {errorMessage}
        </Alert>
      )}
      
      {movies.length > 0 ? (
        <>
          <div className={styles.movieContainer}>
            {movies.map(movie => {
              const isInWatchlist = user?.wishlist.includes(movie._id);

              return (
                <div key={movie._id} className={`${styles.movieCard} card movie-item`}>
                  {movie.image && (
                    <Link href={`/movie/${movie._id}`}>
                      <img src={movie.image} className="card-img-top" alt={movie.title} style={{ height: '400px', objectFit: 'cover', cursor: 'pointer' }} />
                    </Link>
                  )}
                  <div className="card-body">
                    <Link href={`/movie/${movie._id}`} passHref>
                      <h5 className="card-title" style={{ cursor: 'pointer' }}>
                        {movie.title} {movie.discontinued && <span>(Discontinued)</span>}
                      </h5>
                    </Link>
                    <p className="card-text">
                      {movie.description} <br />
                      Rating: {movie.rating} <br />
                      Category: {movie.category} <br />
                      Release Year: {movie.releaseYear}
                    </p>
                    {isInWatchlist ? (
                      <button className="btn btn-danger" onClick={() => handleRemoveFromWatchlist(movie._id)}>Remove from Watchlist</button>
                    ) : (
                      <button className="btn btn-primary" onClick={() => handleAddToWatchlist(movie._id)}>Add to Watchlist</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          <nav aria-label="Page navigation example" className={styles.pagination}>
            <ul className="pagination">
              <li className="page-item">
                <a 
                    className={`page-link ${currentPage === 1 ? 'disabled' : ''}`} 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                    aria-disabled={currentPage === 1}
                >
                    Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link">Page {currentPage} of {totalPages}</a>
              </li>
              <li className="page-item">
                <a 
                    className={`page-link ${currentPage === totalPages ? 'disabled' : ''}`} 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                    aria-disabled={currentPage === totalPages}
                >
                    Next
                </a>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
}

export default MovieList;
