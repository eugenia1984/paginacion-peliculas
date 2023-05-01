import React from 'react'
import './Movie.css'

function Movie({ movies }) {
  return (
    <>
      {movies.length > 0 &&
        movies.map((pelicula) => {
          return (
            <div className="pelicula" key={pelicula.id}>
              <img
                className="poster"
                src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`}
                alt={pelicula.original_title}
                height={200}
              />
              <h3 className="titulo">{pelicula.title}</h3>
              <h4>Rating ({pelicula.vote_average})</h4>
              <p>{pelicula.overview}</p>
            </div>
          )
        })}
    </>
  )
}

export default Movie
