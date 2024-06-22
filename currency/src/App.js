// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
 
import { useEffect, useState } from "react";

export default function App() {

  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState('EUR');
  const [toCur, setToCur] = useState("USD")

  useEffect(function() {
    async function convert() {
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`

      )
      const data = await res.json();
      console.log(data.rates[toCur]);
    }
    convert()
  }, [])

  return (
    <div>
      <input type="text" 
      value={amount}
      onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select value ={fromCur} onChange={(e) => setFromCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value ={toCur} onChange={(e) => setFromCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT</p>
    </div>
  );
}
