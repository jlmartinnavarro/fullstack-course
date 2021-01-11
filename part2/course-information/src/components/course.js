import React from 'react'

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
  
    return (<p><b>total of {x} exercises</b></p>)
  }
  
  const Course = ({course}) => (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>)

export default Course