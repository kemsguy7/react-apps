import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const pizzaData = [
  {
    name: 'Focaccia',
    ingredients: 'Bread with italian olive oil and rosemary',
    price: 6,
    photoName: 'pizzas/focaccia.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Margherita',
    ingredients: 'Tomato and mozarella',
    price: 10,
    photoName: 'pizzas/margherita.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Spinaci',
    ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
    price: 12,
    photoName: 'pizzas/spinaci.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Funghi',
    ingredients: 'Tomato, mozarella, mushrooms, and onion',
    price: 12,
    photoName: 'pizzas/funghi.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Salamino',
    ingredients: 'Tomato, mozarella, and pepperoni',
    price: 15,
    photoName: 'pizzas/salamino.jpg',
    soldOut: true,
  },
  {
    name: 'Pizza Prosciutto',
    ingredients: 'Tomato, mozarella, ham, aragula, and burrata cheese',
    price: 18,
    photoName: 'pizzas/prosciutto.jpg',
    soldOut: false,
  },
]

function App() {
  return (
    <div className="container header">
      <h1> Hello React! </h1>
      <Header />
      <Menu />
      <Footer />
    </div>
  )
}

function Header() {
  const style = { color: 'red', fontSize: '48px', textTransform: 'uppercase' }

  return (
    <header className="header footer">
      <h1 style={style}> Pizza Menu </h1>
    </header>
  )
}

function Menu() {
  //   const pizzas = []
  const pizzas = pizzaData
  const numPizzas = pizzas.length

  return (
    <main className="menu">
      <h2> Our Menu </h2>

      {numPizzas > 0 ? (
        <ul className="pizzas">
          {pizzas.map((pizza) => (
            <Pizza pizzaObj={pizza} key={pizza.name} /> //setting pizzaObj equalt to props so it can be accessed later by child components
          ))}
        </ul>
      ) : (
        <p> We're still working on our menu. Please come back Later </p>
      )}

      {}

      {/* <Pizza 
            name="Pizza Spinaci" 
            ingredients="Tomato, mozarella, spinach, and ricotta cheese"
            photoName="pizzas/spinaci.jpg"
            price={10}
            />

            <Pizza 
            name="Pizza Funghi"
            ingredients="Tomato, mushrooms"
            price= {14}
            photoName="pizzas/funghi.jpg"
            /> */}
    </main>
  )
}

function Pizza(props) {
  console.log(props)

  if (props.pizzaObj.soldOut) return <Header /> //if a particular pizza is sold out, don't display it

  return (
    <li className="pizza">
      <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name} />
      <div>
        <h3> {props.pizzaObj.name} </h3>
        <p> {props.pizzaObj.ingredients} </p>
        <span>{props.pizzaObj.price}</span>
      </div>
    </li>
  )
}

function Footer() {
  const hour = new Date().getHours()
  const openHour = 20
  const closeHour = 22
  const isOpen = hour >= openHour && hour <= closeHour
  console.log(isOpen)

  //   if (hour >= openHour && hour <= closeHour) alert("We're currently open!");
  //   else alert("Sorry we're closed");

  return (
    <footer className="footer">
      {isOpen ? (
        <Order openHour={openHour} />
      ) : (
        <p>
          We're happy to welome you between {openHour} : 00 and {closeHour}:00.
        </p>
      )}
    </footer>
  )
}

function Order(props) {
  return (
    <div className="order">
      <p>
        We're open until {props.closeHour}:00. Come visit us or order online
      </p>
      <button className="btn"> Order </button>
    </div>
  )
}

// React v18
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
