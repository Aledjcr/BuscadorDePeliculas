import { useState } from "react"

export const BuscadorPeliculas = () => {

  const [busqueda, setBusqueda] = useState('')
  const [peliculas, setPeliculas] = useState([])

  const handleInputChange = (e) => {
    setBusqueda(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    fetchPeliculas()
  }

  const fetchPeliculas = async () => {
    try {
      const response = await fetch(`/.netlify/functions/getMovie?query=${busqueda}`);
      const data = await response.json()
      console.log(data.results)
      setPeliculas(data.results)
    } catch (error) {
      console.error('Ha ocurrido un error: ', error)
    }
  }

  return (
    <div className="container">

      <h1 className="title">Buscador de Películas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribí una película"
          value={busqueda}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>


      <div className="movie-list">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
            <h2>{pelicula.title}</h2>
            <p>{pelicula.overview}</p>
          </div>

        ))}

      </div>

    </div>
  )
}
