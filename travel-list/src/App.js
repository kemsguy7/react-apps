import "./App.css";
import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

function App() {
  return (
    <div className="App">
      <Logo />
      <Form />
      <Packinglist />
      <Stats />
    </div>
  );
}

export default App;

export function Logo() {
  return <h1> Far Away Land</h1>;
}

export function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(5);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;  //if description is empty, return an empty result 

    const newItem = { description, quantity, packed: false, id: Date.now() };

    console.log(newItem);
  }

  return (
    <div>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3> What do you need for your trip? </h3>

        <select value={quantity} onChange={(e) => setQuantity(e.target.value) }> 
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>  
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => {
            
            setDescription(e.target.value)}}
        />
        <button> Add </button>
      </form>
    </div>
  );
}

export function Packinglist() {
  return (
    <div className="list">
      {" "}
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}{" "}
      </span>
      <button> ❌ </button>
    </li>
  );
}

export function Stats() {
  return (
    <footer className="stats">
      <em>
        {" "}
        You have X items on your List, and you are already packed X (X%){" "}
      </em>
    </footer>
  );
}


