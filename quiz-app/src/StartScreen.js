function StartScreen({ numQuestions }) {
  return (
    <div className="start">
      <h2> Welcome to The React Quiz </h2>
      <h1> {numQuestions} questions to test your React mastery </h1>
      <button className="btn btn-ui"> Let's start </button>
    </div>
  )
}

export default StartScreen
