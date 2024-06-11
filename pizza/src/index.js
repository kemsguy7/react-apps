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
    <div className="container">
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
        <>
          <p>
            Authentic Italian Cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} /> //setting pizzaObj equalt to props so it can be accessed later by child components
            ))}
          </ul>
        </>
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

function Pizza({ pizzaObj }) {
  //destructuring pizzaObj, the name of the prop passed in menu JSX above
  //   console.log(props)

  if (pizzaObj.soldOut) return null //if a particular pizza is sold out, don't display it

  return (
    <li className={`pizza ${pizzaObj.soldOut ? 'sold-out' : ''} `}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3> {pizzaObj.name} </h3>
        <p> {pizzaObj.ingredients} </p>

        <span>{pizzaObj.soldOut ? 'SOLD OUT' : pizzaObj.price}</span>
      </div>
    </li>
  )
}

function Footer() {
  const hour = new Date().getHours()
  const openHour = 17
  const closeHour = 22
  const isOpen = hour >= openHour && hour <= closeHour
  console.log(isOpen)

  //   if (hour >= openHour && hour <= closeHour) alert("We're currently open!");
  //   else alert("Sorry we're closed");

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>
          We're happy to welome you between {openHour} : 00 and {closeHour}:00.
        </p>
      )}
    </footer>
  )
}

function Order({ closeHour, openHour }) {
  return (
    <div className="order">
      <p>
        We're open from {openHour}:00 to {closeHour}:00. Come visit us or order
        online.
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
  </React.StrictMode>
)
