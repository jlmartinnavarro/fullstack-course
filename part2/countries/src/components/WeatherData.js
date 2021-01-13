const WeatherData = ({weatherData}) => {
  console.log(weatherData)
    if (weatherData !== {} && weatherData.current != undefined) {

      console.log(weatherData)
      return (<div>
        <h4>Weather in {weatherData.location.name}</h4>
        <p>Temperature: {weatherData.current.temperature} Celsius</p>
        <img src={weatherData.current.weather_icons[0]} tag={weatherData.current.weather_descriptions[0]} />
        <p>wind: {weatherData.current.wind_speed} speed direction {weatherData.current.wind_dir}</p>
        </div>)
    }
    else
        return <></>
}

export default WeatherData