import logo from './logo.svg';
import './App.css';

export function App() {
  return (
    <div className="App">
      <FlashCards />
        
    </div>
  );
}

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "Javascript"
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components"
  },
  {
    id: 8832,
    question: "What's the name of the sysntax we use to describe a Ui in react?",
    answer: "JSX"
  },
  {
    id: 3439,
    question: "what is react? ",
    answer: "A Javascript Library for Building interactive user interfaces"
  }
]

function FlashCards() {
  return <div> TODO</div>
}

export default App;
