
import { NextResponse } from 'next/server';
import movies from '../../../data/movies.json';

export function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query')?.toLowerCase().trim() || '';
  
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase() === query
  );

  return NextResponse.json(filteredMovies);
}
