import { useState } from 'react';


export default function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  const date = new Date("Jan 26 2023");
  date.setDate(date.getDate() + count);

  return (
    <div> 
      <div style={{marginLeft: 'auto', marginRight: 'auto'}}> 
        <button onClick={() => setCount((c) => c - 1)}> - </button>
        <span>Count: {count} </span>
        <button onClick={() => setCount((c) => c + 1)}> + </button>
      </div>

      <p> 
        <span>{count === 0 ? "Today is ": count > 0 ? `${count} days from today is`: `${count} days`} </span>
        <span>{date.toDateString()}</span>
      </p>
    </div>
  )
}


