import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({title}) => (
  <h1>{title}</h1>
)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Give = ({title, buttons}) => (
  <div>
    <Title title={title} />
    {buttons.map(({id, handler, text})=><Button key={id} handleClick={handler} text={text}/>)}
  </div>
)

const Statistic  = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({title, counters}) => {
  let all = counters.reduce((acumulator, item) => {return acumulator + item.value}, 0)
  let average;
  let positive_percentage;
  if (all !== 0) {
    const good_counter = counters[0].value  ;
    const bad_counter = counters[2].value;
    average = (good_counter - bad_counter) / all
    positive_percentage = ((good_counter / all)*100);  
    return (
      <div>
        <Title title={title} />
        <table><tbody>
          {counters.map(({id, text, value})=><Statistic  key={id} text={text} value={value}/>)}
          <Statistic  text={"all"} value={all} />
          <Statistic  text={"average"} value={average} />
          <Statistic  text={"positive"} value={positive_percentage + " %"}/>
        </tbody></table>
      </div>
    )
  }
  else {
    return (
      <div>
        <Title title={title} />
        <p>No feedback given</p>
      </div>
    )
  }
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood     = () => {setGood(   good    + 1)};
  const addNeutral  = () => {setNeutral(neutral + 1)};
  const addBad      = () => {setBad(    bad     + 1)};

  const feedback_counters = [
    {id:1, handler: addGood   , text: "good"    , value: good   },
    {id:2, handler: addNeutral, text: "neutral" , value: neutral},
    {id:3, handler: addBad    , text: "bad"     , value: bad    }
  ]
  return (
    <>
      <Give title='give feedback' buttons={feedback_counters}/>
      <Statistics title='statistics' counters={feedback_counters}/>
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)