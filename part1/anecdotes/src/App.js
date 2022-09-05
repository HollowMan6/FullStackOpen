import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0])

  const addVotes = (num) => {
    const copy = [ ...points ]
    // increment the property 2 value by one
    copy[num] += 1
    // set the new state
    setPoints(copy)
  }

  const getMaxVotes = (points) => {
    let max = Math.max(...points)
    return points.indexOf(max)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]}
      </p>
      <p>
        has {points[selected]} votes
      </p>
      <p>
        <button onClick={() => addVotes(selected)}>vote</button>
        <button onClick={() => setSelected(Math.floor(Math.random() * 7))}>next anecdote</button>
      </p>
      <h1>Anecdote with most votes</h1>
      <p>
        {anecdotes[getMaxVotes(points)]}
      </p>
      <p>
        has {points[getMaxVotes(points)]} votes
      </p>
    </div>
  )
}

export default App
