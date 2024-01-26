
import './App.css';

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed:false},
  { id: 2, description: "Socks", quantity: 12, packed: false},
];

function App() {
  return (
    <div className="App">
      <Logo />
      <Form/>
      <Packinglist/>
      <Stats/>

    </div>
  );
}

export default App;

export function Logo() {
  return <h1> Far Away Land</h1>
}

export function Form() {
  return (
    <div className="add-form"> 
      <h3> What do you need for your trip?  </h3>
    </div>
  );
}

export function Packinglist() {
  return <ul className="list"> LIST 
    {initialItems.map((item=> 
      <item item={item} />
    ))}
  </ul>;
}

function Item ({ item }) {
  return <li> {item.description} </li>;
}

export function Stats() {
  return (
    <footer className='stats'> 
      <em> You have X items on your List, and you are already packed X (X%) </em>
    </footer>
  )
}