/*const movies = [
    {
      "id": 1,
      "title": "Inception",
      "description": "A mind-bending thriller",
      "rating": "8.8",
      "releaseYear": 2010,
      "discontinued": false,
      "image": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
      "summary": "A skilled thief, who steals corporate secrets through the use of dream-sharing technology, is given a chance to have his criminal history erased if he can implant an idea into a target's subconscious."
    },
    {
      "id": 2,
      "title": "Interstellar",
      "description": "A journey through space and time",
      "rating": "8.6",
      "releaseYear": 2014,
      "discontinued": false,
      "image": "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
      "summary": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
    },
    {
      "id": 3,
      "title": "The Dark Knight",
      "description": "Batman battles the Joker",
      "rating": "9.0",
      "releaseYear": 2008,
      "discontinued": false,
      "image": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
      "summary": "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, forcing Batman to abandon his rule and fight against his own ideals."
    },
    {
      "id": 4,
      "title": "Avatar",
      "description": "A marine on an alien planet",
      "rating": "7.8",
      "releaseYear": 2009,
      "discontinued": false,
      "image": "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_FMjpg_UX1000_.jpg",
      "summary": "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home."
    },
    {
      "id": 5,
      "title": "Titanic",
      "description": "A love story on the doomed ship",
      "rating": "7.8",
      "releaseYear": 1997,
      "discontinued": false,
      "image": "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
      "summary": "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic."
    },
    {
      "id": 6,
      "title": "The Matrix",
      "description": "A hacker discovers the truth",
      "rating": "8.7",
      "releaseYear": 1999,
      "discontinued": false,
      "image": "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
      "summary": "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
    },
    {
      "id": 7,
      "title": "The Godfather",
      "description": "The story of a crime family",
      "rating": "9.2",
      "releaseYear": 1972,
      "discontinued": false,
      "image": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg",
      "summary": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
    },
    {
      "id": 8,
      "title": "Pulp Fiction",
      "description": "Interwoven stories of crime",
      "rating": "8.9",
      "releaseYear": 1994,
      "discontinued": false,
      "image": "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      "summary": "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
    },
    {
      "id": 9,
      "title": "The Lord of the Rings: The Fellowship of the Ring",
      "description": "The journey to destroy the One Ring",
      "rating": "8.8",
      "releaseYear": 2001,
      "discontinued": false,
      "image": "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg",
      "summary": "A young hobbit, Frodo Baggins, is tasked with the quest to destroy a powerful ring that could bring about the end of the world."
    },
    {
      "id": 10,
      "title": "Star Wars: Episode IV - A New Hope",
      "description": "A young farmer joins the fight against the Empire",
      "rating": "8.6",
      "releaseYear": 1977,
      "discontinued": false,
      "image": "https://m.media-amazon.com/images/I/612h-jwI+EL._AC_UF894,1000_QL80_.jpg",
      "summary": "A young farm boy joins a group of rebels to fight against the tyrannical Galactic Empire and restore peace to the galaxy."
    },
    {
      "id": 11,
      "title": "Jurassic Park",
      "description": "Dinosaurs are brought back to life",
      "rating": "8.1",
      "releaseYear": 1993,
      "discontinued": false,
      "image": "https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_.jpg",
      "summary": "Scientists clone dinosaurs to create a theme park, but chaos ensues when the creatures break free and threaten the lives of those on the island."
    },
    {
      "id": 12,
      "title": "Forrest Gump",
      "description": "The life story of a simple man",
      "rating": "8.8",
      "releaseYear": 1994,
      "discontinued": false,
      "image": "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
      "summary": "The presidencies of Kennedy and Johnson, the Vietnam War, the civil rights movement, the moon landing, and other historical events unfold from the perspective of an Alabama man with an IQ of 75."
    },
    {
      "id": 13,
      "title": "The Lion King",
      "description": "A young lion's journey to become king",
      "rating": "8.5",
      "releaseYear": 1994,
      "discontinued": false,
      "image": "https://m.media-amazon.com/images/M/MV5BMjIwMjE1Nzc4NV5BMl5BanBnXkFtZTgwNDg4OTA1NzM@._V1_FMjpg_UX1000_.jpg",
      "summary": "Lion prince Simba and his father are targeted by his bitter uncle, who wants to take over the throne."
    },
    {
      "id": 14,
      "title": "Back to the Future",
      "description": "A teenager travels through time",
      "rating": "8.5",
      "releaseYear": 1985,
      "discontinued": false,
      "image": "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
      "summary": "A teenager is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his friend, Dr. Emmett Brown."
    },
    {
      "id": 15,
      "title": "Toy Story",
      "description": "Toys come to life when humans aren't around",
      "rating": "8.3",
      "releaseYear": 1995,
      "discontinued": false,
      "image": "https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_.jpg",
      "summary": "A group of toys that come to life when their owners are not around face the challenge of being replaced by a new toy."
    },
    {
      "id": 16,
      "title": "The Avengers",
      "description": "Earth's mightiest heroes must come together",
      "rating": "8.0",
      "releaseYear": 2012,
      "discontinued": false,
      "image": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
      "summary": "Nick Fury of S.H.I.E.L.D. assembles a team of superheroes to save the world from Loki and his army."
    },
    {
      "id": 17,
      "title": "Guardians of the Galaxy",
      "description": "A group of intergalactic misfits band together",
      "rating": "8.0",
      "releaseYear": 2014,
      "discontinued": false,
      "image": "https://m.media-amazon.com/images/M/MV5BNDIzMTk4NDYtMjg5OS00ZGI0LWJhZDYtMzdmZGY1YWU5ZGNkXkEyXkFqcGdeQXVyMTI5NzUyMTIz._V1_.jpg",
      "summary": "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe."
    },
    {
      "id": 18,
      "title": "Frozen",
      "description": "A princess sets out to find her estranged sister",
      "rating": "7.4",
      "releaseYear": 2013,
      "discontinued": false,
      "image": "https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_.jpg",
      "summary": "When their kingdom becomes trapped in eternal winter, Princess Anna sets off on a perilous journey with an iceman, his loyal reindeer, and an enchanted snowman to find her estranged sister and save their home."
    },
    {
      "id": 19,
      "title": "Shrek",
      "description": "An ogre's journey to rescue a princess",
      "rating": "7.9",
      "releaseYear": 2001,
      "discontinued": false,
      "image": "https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",
      "summary": "An ogre's peaceful life is disrupted when a bunch of fairy-tale characters are exiled to his swamp, leading him on a quest to rescue a princess and reclaim his land."
    },
    {
      "id": 20,
      "title": "Harry Potter and the Philosopher's Stone",
      "description": "A young boy discovers he's a wizard",
      "rating": "7.6",
      "releaseYear": 2001,
      "discontinued": false,
      "image": "https://m.media-amazon.com/images/M/MV5BNmQ0ODBhMjUtNDRhOC00MGQzLTk5MTAtZDliODg5NmU5MjZhXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_.jpg",
      "summary": "Harry Potter, an eleven-year-old orphan, discovers he is a wizard and begins his magical education at Hogwarts School of Witchcraft and Wizardry."
    }
  ];

export default function handler(req, res) {
    const { query } = req.query;
  
    if (query) {
      const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      res.status(200).json(filteredMovies);
    } else {
      res.status(200).json(movies);
    }
  }*/