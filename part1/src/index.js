import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
)

const Content = (props) => (
    <>
      {props.parts.map((part)=><Part key={part.id} name={part.name} exercises={part.exercises}/>)}
    </>
  )
const Total = (props) => {
  const x = props.parts.reduce((total, current) => total + current.exercises, 0)

  return (<p>Number of exercises {x}</p>)
}

const App = () => {
  const course = {
    name:'Half Stack application development',
    parts: [{id:1, name:'Fundamentals of React'   , exercises:10}, 
            {id:2, name:'Using props to pass data', exercises:7 },
            {id:3, name:'State of a component'    , exercises:14}]
  }
  return (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))