import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Footer from '../footer/Footer'
import './Movies.css'

function Movies() {
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [movies, setMovies] = useState([])

  const btnPreview = (e) => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const btnNext = (e) => {
    if (currentPage < 10 && currentPage > 0) {
      setCurrentPage(currentPage + 1)
    }
  }

  useEffect(() => {
    const getMovies = async (currentPage) => {
      let data = []
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=191528030c357419329af1198edbcb24&language=en-US&page=${currentPage}`
        )

        if (response.status === 200) {
          // if it's ok and I have response with the data
          data = await response.json()
          data = data.results
          setLoading(false)
          setMovies(data)
        }

        if (response.status === 401) {
          // if there is an error I let know the user
          Swal.fire('Error', 'Incorrect key', 'error')
        }
        if (response.status === 404) {
          Swal.fire('Error', 'Not available', 'error')
        }
      } catch (error) {
        const errorMsg = error.message
        Swal.fire('Error', errorMsg, 'error')
      }
    }

    getMovies(currentPage)
  }, [currentPage])

  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <section>
      {loading && <p>Loading movies..</p>}
      <div className="contenedor" id="contenedor">
        {movies.length > 0 &&
          movies.map((pelicula) => {
            return (
              <div className="pelicula" key={pelicula.id}>
                <img
                  className="poster"
                  src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`}
                  alt="movie"
                />
                <h3 className="titulo">{pelicula.title}</h3>
                <h4>Rating ({pelicula.vote_average})</h4>
                <p>{pelicula.overview}</p>
              </div>
            )
          })}
      </div>
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
                <span style={styles.currentPage} key={page}>
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

const styles = {
  currentPage: {
    backgroundColor: 'red',
    padding: '6px',
    borderRadius: '50%'
  }
}
