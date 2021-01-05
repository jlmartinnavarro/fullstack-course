import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>
    {props.name} {props.value}
  </p>
)

const Content = (props) => {
  const mapping = props.parts.map(part => (<Part name={part.name} value={part.value}/>))
  const reducing = mapping.reduce((total, current)  => total + current, '')
  return reducing
}
const Total = (props) => {
  const x = props.parts.reduce((total, current) => total + current.value, 0)

  return (<p>Number of exercises {x}</p>)
}

const App = () => {
  const course = 'Half Stack application development'
  /*const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14*/
  
  const parts = [{id:1, name:'Fundamentals of React', value:10}, 
                {id:2, name:'Using props to pass data', value:7},
                {id:3, name:'State of a component', value:14}]

  return (
    <>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))