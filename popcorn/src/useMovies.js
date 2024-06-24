import { useState, useEffect } from 'react'

export function useMovies(query) {
  const [movies, setMovies] = useState([]) // Managing movies state
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('') //state variable for error handling

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
}
