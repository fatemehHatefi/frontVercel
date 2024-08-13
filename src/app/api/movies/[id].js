//src/app/api/movies/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const MovieDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/movies?id=${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Movie not found');
          }
          return response.json();
        })
        .then(data => setMovie(data))
        .catch(error => setError(error.message));
    }
  }, [id]);

  if (error) {
    return <div>Error fetching movie: {error}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>Rating: {movie.rating}</p>
      <p>Release Year: {movie.releaseYear}</p>
      <img src={movie.image} alt={movie.title} />
      <p>{movie.summary}</p>
    </div>
  );
};

export default MovieDetail;
