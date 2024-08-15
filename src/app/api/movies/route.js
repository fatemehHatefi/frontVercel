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
// src/app/api/movies/route.js
import { NextResponse } from 'next/server';



  export async function GET(request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
  
    if (id) {
      const movie = movies.find(movie => movie.id.toString() === id);
      if (!movie) {
        return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
      }
      return NextResponse.json(movie);
    }
  

    const query = url.searchParams.get('query')?.toLowerCase() || '';
    
    if (query === '') {
      return NextResponse.json(movies); // Return all movies if no query
    }
    
    const filteredMovies = movies.filter(movie =>
      movie.title.toLowerCase().includes(query)
    );
    
    return NextResponse.json(filteredMovies);
  }