import React from 'react'
import Footer from './footer/Footer';

function Movies() {
  let page = 1;

  const btnPreview = (e) => {
    if(page > 1){
        page -= 1;
        getMovies();  
    }
  }

  const btnNext = (e) => {
    if(page < 1000){
        page += 1;
        getMovies();  
    }
  }

  const getMovies = async () => {
    try {
      const respuesta = await fetch (
        `https://api.themoviedb.org/3/movie/popular?api_key=191528030c357419329af1198edbcb24&language=es-MX&page=${page}`
      )
      console.log("Status response: ", respuesta.status)

      // if it`s ok and I have response with the data
      if (respuesta.status === 200) { 
        const data = await respuesta.json()
        console.log("Data: ", data)
        let peliculas = ''
        data.results.forEach((pelicula) => {
          peliculas += `
                        <div className="pelicula">
                            <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                            <h3 class="titulo">${pelicula.title}</h3>
                            <p>${pelicula.overview}</p>
                        </div> 
                      `
        })

        document.getElementById('contenedor').innerHTML = peliculas
      }
      // Si hay errores y no trae bien los datos
      // habria que sumarle con el sweetalert2 agregar un mensaje, sino el usuario no sabe que pasa
      else if (respuesta.status === 401) {
        console.log('Key incorrecta')
      } else if (respuesta.status === 404) {
        console.log('no disponible')
      } else {
        console.log('no tengo idea del error')
      }
    } catch (error) {
      // Aca con el sweetalert2 se podria enviar un alerta
      console.log(error.message)
    }
  }

  getMovies();

  return (
    <div>
        <div class="contenedor" id="contenedor"></div>
        <Footer btnPreview={btnPreview} btnNext={btnNext}/>
    </div>
  )
}

export default Movies
