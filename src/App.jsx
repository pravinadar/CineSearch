import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import './App.css'
import Search from './components/Search'
import LoadingSpinner from './components/LoadingSpinner'
import MovieCard from './components/MovieCard'
import { updateSearchCount } from './appwrite/appwrite'
import { getTrendingMovies } from './appwrite/appwrite'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL

// from docs
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

function App() {
  const [isLoading, setIsLoading] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")

  const [errorMessage, setErrorMessage] = useState("")

  const [movieList, setMovieList] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 800, [searchTerm])

  async function fetchMovies(query = '') {
    setIsLoading(true)
    setErrorMessage("")

    try {
      const apiEndpoint = query ?
        `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc`
        : `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
      
      const response = await fetch(apiEndpoint, API_OPTIONS)

      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }

      const data = await response.json()
      // console.log(data)

      if (data.Response === 'False') {
        setErrorMessage(data.Error || "Failed to fetch movies")
        setMovieList([])
      }

      setMovieList(data.results || [])

      if (query && data.results.length > 0) {
        updateSearchCount(query, data.results[0])
      }

    } catch (error) {
      console.error(error)
      setErrorMessage("Error fetching movies")
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchTrendingMovies() {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error("Error fetching trending movies:", error)
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  useEffect(() => {
    fetchTrendingMovies()
  }, [])

  console.log(trendingMovies)

  return (
    <main>
      <div className='pattern' />

      <div className='wrapper'>

        <header>
          <img src='./hero-img.png' alt='Hero Banner' />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className='trending'>
          <h2 className='text-center'>Trending</h2>
          <ul>
            {trendingMovies.map((movie, index) => (
              <li key={movie.$id}>
                <p>{index + 1}</p>
                <img src={movie.posterURL} alt="" />
              </li>
            ))}
          </ul>
        </section>

        <section className='all-movies'>
          <h2 className='text-center'>Latest Movies</h2>
          {isLoading ? (
            <LoadingSpinner />
          ) : (errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          ))}
        </section>

      </div>


    </main>
  )
}

export default App
