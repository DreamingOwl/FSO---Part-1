import { useState } from 'react'

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

const VoteLine = (props) => {
  return (
    <p>has {props.text} vote</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [points, setPoints] = useState (Array(anecdotes.length).fill(0))

  const [selected, setSelected] = useState(0)
  const [highestVote, setHighestVote] = useState(0)

  const getNextAnecdotes = () => {
    setSelected(getRandomInt(anecdotes.length))
  }

  const checkIfVoteIsHighest = (currentPoint) => {
    return currentPoint > points[highestVote]
  }

  const voteAnecdotes = () => {
    const copyPoint = [...points]
    copyPoint[selected]++
    setPoints(copyPoint)

    if (checkIfVoteIsHighest(copyPoint[selected])){
      setHighestVote(selected)
    }

  }

  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <p>{anecdotes[selected]}</p>
      <VoteLine text={points[selected]} />
      <button onClick={voteAnecdotes}>vote</button>
      <button onClick={getNextAnecdotes}>next anecdotes</button>
      <h1>Anecdotes with most vote</h1>
      <p>{anecdotes[highestVote]}</p>
      <VoteLine text={points[highestVote]} />
    </div>
  )
}

export default App