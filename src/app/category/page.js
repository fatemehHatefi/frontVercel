'use client';
import { useEffect, useState} from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './CategoryPage.module.css'; // Import the CSS module
import Image from 'next/image';
import { Suspense } from 'react';

const CategoryContent = () => {
  const searchParams = useSearchParams(); // Access search parameters
  const category = searchParams.get('category'); // Get the query parameter from the URL
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);

  // Fetch movies based on the selected category
  useEffect(() => {
    const fetchMovies = async () => {
      if (category) {
        try {
          const response = await fetch(`https://backrender-pzkd.onrender.com/category?category=${encodeURIComponent(category)}`);
          
          if (response.ok) {
            const data = await response.json();
            setMovies(data);
          } else {
            console.error('Error fetching movies from category');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchMovies();
  }, [category]);

  // Get user email from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('userEmail');
      setEmail(storedEmail);
    }
  }, []);

  // Fetch user details based on email
  useEffect(() => {
    const fetchUser = async () => {
      if (email) {
        try {
          const response = await fetch(`https://backrender-pzkd.onrender.com/user?email=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include auth token if needed
            }
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            console.error('Failed to fetch user');
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };

    fetchUser();
  }, [email]);

  // Handle adding a movie to the user's watchlist
  const handleAddToWatchlist = async (userId, movieId) => {
    try {
      const response = await fetch('https://backrender-pzkd.onrender.com/api/wishlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add auth token if using JWT
        },
        body: JSON.stringify({ userId, movieId })
      });

      if (response.ok) {
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

  // Handle removing a movie from the user's watchlist
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
    <div className={styles.categoryPage}>
      <h1>{category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Movies'}</h1>
      <div className={styles.moviesList}>
        {movies.length > 0 ? (
          movies.map(movie => {
            const isInWatchlist = user?.wishlist.includes(movie._id);

            return (
              <div key={movie._id} className="card" style={{ width: '18rem' }}>
                {movie.image && (
                  <a href={`/movie/${movie._id}`}>
                    <Image 
                      src={movie.image} 
                      className={styles.cardImgTop} 
                      alt={movie.title} 
                      width={288} // adjust this value based on your layout
                      height={400} // adjust this value based on your layout
                      style={{ height: '400px', objectFit: 'cover', cursor: 'pointer' }} 
                    />
                  </a>
                )}
                <div className="card-body">
                  <a href={`/movie/${movie._id}`} passHref>
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
          <p>No movies found for this category.</p>
        )}
      </div>
    </div>
  );
};

const CategoryPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CategoryContent />
  </Suspense>
);

export default CategoryPage;
