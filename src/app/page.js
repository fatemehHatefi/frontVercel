'use client'; // Add this line to make this a client component

import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import { useState } from 'react';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <h1>Welcome to the MovieVerse</h1>
      <MovieList searchTerm={searchTerm} />
    </div>
  );
}