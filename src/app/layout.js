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
      fetch(`https://backrender-pzkd.onrender.com/search?query=${encodeURIComponent(searchTerm)}`)
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
