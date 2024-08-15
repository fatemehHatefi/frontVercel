/*****************************************************************************
*
WEB422 – Project
*
I declare that this assignment is my own work in accordance with SenecaAcademic Policy.
*
No part of this assignment has been copied manually or electronically from any other source
*
(including web sites) or distributed to other students.
*
*
Group member Names: Fatemeh Hatefi, Dhruv Sahni 
Student IDs: 142616218, 143525228 
Date: 08/13/2024
*****************************************************************************/
'use client'; // Add this line to make this a client component
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
