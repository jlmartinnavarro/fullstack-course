import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
//import reportWebVitals from './reportWebVitals';
const App = (props) => {
  const { counter } = props
  return (
    <div>{counter}</div>
  )
}

let counter = 1

const refresh = () => {
  ReactDOM.render(<App counter={counter} />, 
  document.getElementById('root'))
}

refresh()
counter += 1
refresh()
counter += 1
refresh()

/**
 * OR
 * setInterval(() => {
  refresh()
  counter += 1
}, 1000)
 */

 /*
abut better

setInterval(() => {
  refresh()
  counter += 1
}, 1000)



  setClicks({ ...clicks, right: clicks.right + 1 })
 */