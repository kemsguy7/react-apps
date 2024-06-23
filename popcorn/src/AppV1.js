import { useState, useEffect } from 'react'

import StarRating from './StarRating'

const tempMovieData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
]

const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
]

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)

const KEY = 'f84fc31d' //defining the API key

export default function App() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([]) // Managing movies state

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('') //state variable for error handling
  const [selectedId, setSelectedId] = useState('tt1375666')

  //const [watched, setWatched] = useState([])

  const tempQuery = 'interstellar'

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id))
  }

  function handleCloseMovie() {
    //set the selected ID to null
    setSelectedId(null)
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie])

    //localStorage.setItem('wactched', JSON.stringify([...watched, movie])) // will be done inside an effect instead
    //store the watched movies in local storage
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }

  useEffect(
    //useEffect to add the watched movies from local storage
    function () {
      localStorage.setItem('watched', JSON.stringify(watched))
    },
    [watched]
  )

  useEffect(
    function () {
      const controller = new AbortController() //abort controller to cancel the fetch request

      async function fetchMovies() {
        try {
          setIsLoading(true) // Loading is set to true while data is being fetched
          setError('') //reset the error state
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: AbortController.signal }
          )

          //error handling
          if (!res.ok)
            throw new Error('Something went wrong with fetching movies')

          const data = await res.json()
          if (data.Response === 'False') throw new Error('Movie not found') //if the request not found

          setMovies(data.Search)
          setError('') // reset the error state
          console.log(data.Search)
        } catch (err) {
          if (err.name !== 'AbortError') {
            console.log(err.message)
            setError(err.message)
          }
        } finally {
          setIsLoading(false)
        }
      }

      if (query.length < 2) {
        // if search characters is less than 2

        //if no movie has been found. This will prevent the fetchMovies function below from running
        setMovies([])
        setError('')
        return
      }

      handleCloseMovie() //close the movie details when a new search is made
      fetchMovies()

      return function () {
        //return to prevent the fetchMovies function from running
        controller.abort()
      }
    },
    [query]
  ) // useEffect makes the fuction not to run while the component is being rendered but after it has been painted to the screen

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        {/* 
        Instead of using children props, props can be passed explicitly using the method below
        "element will be passes as props in this case to the box component"
        <Box element ={<MovieList movies={movies}  />} />
        <Box element={
          <>
            <WatchedSummary watched={watched} />
            <WatchedMoviesList watched={watched} />
          </>
        }
        />
      
      */}
        <Box>
          {/*  {isLoading ? <Loader/> : <MovieList movies={movies} /> }  */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  )
}

function Loader() {
  return <p className="loader"> Loading... </p>
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span> </span> {message}
    </p>
  )
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  )
}

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong> {movies.length} </strong> results
    </p>
  )
}

function Main({ children }) {
  return <main className="main">{children}</main>
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  )
}

/*
function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData)
  const [isOpen2, setIsOpen2] = useState(true)

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? '–' : '+'}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </>
      )}
    </div>
  )
}*/

// MovieList component
function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        // Passing each movie object as a prop to the Movie component
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  )
}

// Movie component
function Movie({ movie, onSelectMovie, onAddWatched }) {
  // Receiving the movie prop and rendering its details
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  )
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState('')

  //check is the watched movie list already contains the movie to prevent duplication
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId)
  console.log(isWatched)

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie //destructure the variable names from the state

  console.log(title)

  const [avgRating, setAvgRating] = useState(0)

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split('  ').at(0)),
      userRating,
    }

    onAddWatched(newWatchedMovie)
    onCloseMovie()

    //   setAvgRating(Number(imdbRating))
    //   setAvgRating((avgRating) => (avgRating + userRating) / 2) // using a callbalc function to calculate the average rating, beacuse the state is not updated immediately
  }

  useEffect(
    //This efffect uses the escape key to close the movie details
    function () {
      function callback(e) {
        if (e.code === 'Escape') {
          onCloseMovie()
          console.log('CLOSING')
        }
      }

      document.addEventListener('keydown', callback)

      return function () {
        document.removeEventListener('keydown', callback)
      }
    },
    [onCloseMovie]
  )

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true)
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        )
        const data = await res.json()
        // console.log(data)
        setMovie(data) //setting the movie state to the data fetched
        setIsLoading(false)
      }
      getMovieDetails()
    },
    [selectedId]
  )

  useEffect(
    function () {
      if (!title) return //this efect will be used to dynamically change the title of the movie
      document.title = `Movie | ${title}`

      return function () {
        document.title = 'Popcorn' //reset the title of the page when the component is unmounted(back button is clicked)
      }
    },
    [title]
  )

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span> ⭐️ </span> {imdbRating} IMDb rating{' '}
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? ( // if the movie has not been rated or added to the watched list
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}{' '}
                </>
              ) : (
                // is the movie has been rated and added to the watched list
                <p>
                  {' '}
                  You Rated this movie {watchedUserRating}
                  <span>⭐️ </span>
                </p>
              )}
            </div>
            <p>
              <em> {plot} </em>
            </p>
            <p>Starring {actors} </p>
            <p> Directed by {director} </p>
          </section>
        </>
      )}
    </div>
  )
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating))
  const avgUserRating = average(watched.map((movie) => movie.userRating))
  const avgRuntime = average(watched.map((movie) => movie.runtime))

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  )
}

function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  )
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>

      <button
        className="btn-delete"
        onClick={() => onDeleteWatched(movie.imdbID)}
      >
        X
      </button>
    </li>
  )
}
