import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const filter = state.filter
    const anecdotes = state.anecdotes
    if (filter === '') return anecdotes

    return anecdotes.filter((anecdote) => anecdote.content.indexOf(filter) > 0)
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(showNotification(`Vote: '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(showNotification(null))
    }, 5000)
  }
  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => (a.votes > b.votes ? -1 : 1)) &&
        anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              Has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>Vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList