'use client'; // Add this line to make this a client component

import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('userEmail');
      if (email) {
        setUserEmail(email);
      }
    }
  }, []);

  return (
    <div>
      <h1>Welcome to the MovieVerse</h1>
      <MovieList searchTerm={searchTerm} />
    </div>
  );
}
