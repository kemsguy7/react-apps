import { useState, useEffect } from 'react'
// Custom hook to get watched movies from local storage

export function useLocalStorage(initalState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : initalState
  })

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value))
    },
    [value, key]
  )
  return [value, setValue]
}