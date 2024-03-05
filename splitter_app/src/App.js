import React, { useState } from 'react'
const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
]

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {' '}
      {children}{' '}
    </button>
  )
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends)
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState(null)

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show) //change the showAddFriend state
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]) //crete a new array of friends
    setShowAddFriend(false) // hide the add friend form
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend ? null : friend)) //if the selected friend is the same as the friend, then set the selected friend to null, otherwise set the selected friend to the friend)
    setShowAddFriend(false) //hide the add friend form on second click
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    )

    setSelectedFriend(null) //Set the form to null after you've finshed
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? 'Close' : 'Add friend'}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  )
}

function FriendList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  )
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id //if the selectedFriend id is equal to the friend id, then the friend is selected

  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          {' '}
          You Owe {friend.name} {Math.abs(friend.balance)}{' '}
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {' '}
          {friend.name} owes you {Math.abs(friend.balance)}{' '}
        </p>
      )}

      {friend.balance === 0 && <p> You and {friend.name} are even</p>}

      <Button onClick={() => onSelection(friend)}>
        {' '}
        {isSelected ? 'Close' : 'Select'}{' '}
      </Button>
    </li>
  )
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('https://i.pravatar.cc/48')

  function handleSubmit(e) {
    e.preventDefault()

    if (!name || !image) return //if there is no name or image, return immediately (nothing is going to happen)

    const id = crypto.randomUUID()
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    }

    onAddFriend(newFriend)

    //Set back the state to default values below
    setName('')
    setImage('https://i.pravatar.cc/48')
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label> Friend name </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label> Image URL </label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button> Add </Button>
    </form>
  )
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState('')
  const [paidByUser, setPaidByUser] = useState('')
  const paidByFriend = bill ? bill - paidByUser : ''
  const [whoIsPaying, setWhoIsPaying] = useState('user')

  function handleSubmit(e) {
    e.preventDefault()

    if (!bill || !paidByUser) return //if there is no bill or paidByUser, return immediately (nothing is going to happen)
    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser) // if whoIsPaying is user, then the bill is paid by the friend, otherwise the bill is paid by the user
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2> Split a bill with {selectedFriend.name} </h2>

      <label>💰 Bill value </label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label> Your expenses </label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label> {selectedFriend.name}'s expenses </label>
      <input type="text" disabled value={paidByFriend} />

      <label>Who is paying the bill </label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user"> You </option>
        <option value="friend"> X </option>
      </select>

      <button> Split bill</button>
    </form>
  )
}
