// src/app/layout.js
'use client'; // Ensure this is a Client Component

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import '../../src/app/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RootLayout({ children }) {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm.trim()) {
      console.log('useEffect for fetch called with searchTerm:', searchTerm);
      fetch(`http://localhost:5001/search?query=${encodeURIComponent(searchTerm)}`)
        .then(response => {
          console.log('Response status:', response.status); // Log status
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Data received:', data); // Log the data received
          setMovies(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [searchTerm]);

  return (
    <html lang="en">
      <body>
        <Navbar setSearchTerm={setSearchTerm} />
        <main>
          {React.cloneElement(children, { movies, setSearchTerm })}
        </main>
      </body>
    </html>
  );
}
