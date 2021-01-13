import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './Countries'

import Filter from './Filter'
import WeatherData from './WeatherData'

const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ filter, setNewFilter ] = useState('')
  const [ countryToShow, setCountryToShow] = useState(-1)
  const [ weatherData, setWeatherData] = useState({})


  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
        console.log(response.data)
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    setCountryToShow(-1)
  }
  
  const handleCountryToShow = (event) => {
    console.log(event.target.value)
    setCountryToShow(event.target.value)
    axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${countriesToShow[event.target.value].capital}`).then(response => {
        console.log(response.data)
        setWeatherData(response.data)
    })
  }

  let countriesToShow = countries.filter(country => country.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))  
  if (countriesToShow.length > 10)
    countriesToShow = [{name:'Too many matches, specify another filter'}]

  return (
    <div>
        <h2>Find countries</h2>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <Countries countriesToShow={countriesToShow} handleCountryToShow={handleCountryToShow} countryToShow={countryToShow}/>
            <WeatherData weatherData={weatherData} />
    </div>
  )
}

export default App