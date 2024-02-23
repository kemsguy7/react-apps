import "./App.css";
import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
// ];

export default function App() {

 // const [items, setItems] = useState([initialItems]); //can set initial state here

  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]); //Adding items without mutating state  
  }
  
  function handleDeleteItem(id) { 
    setItems((items) => items.filter((item)=> item.id !== id)); // 
  }

  function handleToggleItem(id) {
    setItems((items) => 
      items.map((item) => 
        item.id === id ? { ...item, packed: !item.packed } : item)
      )
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <Packinglist items={items} onDeleteitem={handleDeleteItem} onToggleItems={handleToggleItem}/>
      <Stats items={items} />
    </div>
  );
}

export function Logo() {
  return <h1> Far Away Land</h1>;
}

export function Form( {onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(5);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;  //if description (FORM FIELD) is empty, return an empty result 

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem); 
    setDescription("");
    setQuantity(1);
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

export function Packinglist({ items, onDeleteitem , onToggleItems}) {
  return (
    <div className="list">
      {" "}
      <ul>
        {items.map((item) => (
          <Item item={item} onDeleteitem={onDeleteitem} onToggleItems key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteitem }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => {}} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}{" "}
      </span>
      <button onClick={() =>onDeleteitem(item.id)}> ❌ </button>
    </li>
  );
}

export function Stats({ items }) {
  const numItems = items.length; 
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);


  return (
    <footer className="stats">
      <em>
        {percentage === 100 ? 'You got everything ! Ready to go + ': 
        `You have ${numItems} items on your List, and you are already packed ${numPacked} (${percentage}%) `
        
  }
      </em>
    </footer>
  );
}


