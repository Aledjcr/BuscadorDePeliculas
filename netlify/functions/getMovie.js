// Funcion creada para hacer la consulta 
export async function handler(event) {
  const busqueda = event.queryStringParameters.movie;
  const API_KEY = process.env.TM_DB_API_KEY; // Asegúrate de definir tu API_KEY aquí


  https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=7317e1e8dd569e9ce14b53d21044990a 


  const url = `https://image.tmdb.org/t/p/w500${busqueda}&api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } else {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.message || 'Error al obtener los datos de la pelicula' }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error de red o del servidor' }),
    };
  }
}