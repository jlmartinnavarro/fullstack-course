import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Title = ({text}) => (
  <h1>{text}</h1>
)

const Anecdote = ({anecdote, votes}) => (
  <>
    {anecdote}<br/>
    <p>has {votes} votes</p>
  </>
)

const RandomAnecdote = ({anecdote, votes, voteHandler, nextSelected}) => (
  <div>
    <Title text={"Anecdote of the day"}/>
    <Anecdote anecdote={anecdote} votes={votes} />
    <Button handleClick={voteHandler} text={"vote"} />
    <Button handleClick={nextSelected} text={"next anecdote"} />
  </div>
)

const TopAnecdote = ({anecdotes, votes}) => {
  const max = Math.max(...votes)
  return (
    <div>
      <Title text={"Anecdote with most votes"}/>
      <Anecdote anecdote={anecdotes[votes.indexOf(max)]} votes={max} />
    </div>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const nextSelected = () => {setSelected(Math.floor(Math.random() * anecdotes.length))}
  
  const states = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0);

  const [votes, setVotes] = useState(states)

  const handleVote = (index) => {
    return () => {
      const newState = [...votes]
      newState[index] += 1
      setVotes(newState)
    }
  }

  return (
    <div>
        <RandomAnecdote anecdote={anecdotes[selected]} votes={votes[selected]} voteHandler={handleVote(selected)} nextSelected={nextSelected}/>
        <TopAnecdote anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)