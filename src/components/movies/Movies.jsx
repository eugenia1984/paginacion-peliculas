import React, { useState } from 'react'
import Swal from 'sweetalert2'
import Footer from '../footer/Footer'
import './Movies.css'

function Movies() {
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const btnPreview = (e) => {
    if (currentPage > 1) {
      getMovies()
      setCurrentPage(currentPage - 1)
    }
  }

  const btnNext = (e) => {
    if (currentPage < 10 && currentPage > 0) {
      getMovies()
      setCurrentPage(currentPage + 1)
    }
  }

  const getMovies = async () => {
    try {
      const respuesta = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=191528030c357419329af1198edbcb24&language=es-MX&page=${currentPage}`
      )

      // if it's ok and I have response with the data
      if (respuesta.status === 200) {
        const data = await respuesta.json()
        setLoading(false)
        console.log('Data: ', data)
        let peliculas = ''
        data.results.forEach((pelicula) => {
          peliculas += `
                        <div class="pelicula">
                            <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                            <h3 class="titulo">${pelicula.title}</h3>
                            <h4>Rating: ${pelicula.vote_average}</h4>
                            <p>${pelicula.overview}</p>
                        </div> 
                      `
        })

        document.getElementById('contenedor').innerHTML = peliculas
      }

      // if there is an error I let know the user
      if (respuesta.status === 401) {
        Swal.fire('Error', 'Incorrect key', 'error')
      }
      if (respuesta.status === 404) {
        Swal.fire('Error', 'Not available', 'error')
      }
    } catch (error) {
      const errorMsg = error.message
      Swal.fire('Error', errorMsg, 'error')
    }
  }

  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <section >
      {loading && <p>Loading movies..</p>}
      <div className="contenedor" id="contenedor"></div>
      <div className="pagination">
        <div className="paginationBtn">
          <button onClick={btnPreview}>Preview</button>
          <button onClick={btnNext} id="btnSiguiente">
            Next
          </button>
        </div>
        <div className="paginationNumbers">
          <p className="currentPage">
            {pages.map((page) =>
              page === currentPage ? (
                <span style={{ color: 'red' }} key={page}>
                  {page}
                </span>
              ) : (
                <span key={page}>{page}</span>
              )
            )}
          </p>
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default Movies
