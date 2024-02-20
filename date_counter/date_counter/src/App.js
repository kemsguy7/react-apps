import { useState } from 'react'

export default function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  )
}

function Counter() {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)

  const today = new Date()
  const date = today.toISOString().slice(0, 10)
  date.setDate(date.getDate() + count)

  return (
    <div
      style={{
        marginLeft: '30rem',
        marginRight: 'auto',
        marginTop: '4rem',
        fontSize: '2rem',
      }}
    >
      <div>
        <button onClick={() => setCount((c) => c - 1)}> - </button>
        <span> Count: {count} </span>
        <button onClick={() => setCount((c) => c + 1)}> + </button>
      </div>
    </div>
  )
}
