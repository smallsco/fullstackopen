import React, {useState, useEffect} from 'react'
import axios from 'axios'

const CountryData = ({ country }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?units=metric&q=${country.capital},${country.alpha2Code}&APPID=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`).then(response => {
      setWeather(response.data)
    })
  }, [country])

  return (
    <div>
      <h2>{country.name}</h2>
      <img src={country.flag} alt={country.name} style={{height: '5%', width: '5%'}} /><br />
      <b>Capital:</b> {country.capital}<br />
      <b>Population:</b> {country.population}<br />
      <b>Languages:</b>
      <ul>
        { country.languages.map(language =>
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      {weather.weather &&
        <>
          <b>Weather in {country.capital}:</b>
          <ul>
            <li><img alt={weather.weather[0].main} src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} /> {weather.weather[0].main}</li>
            <li><b>Temperature</b>: {weather.main.temp} degrees celcius</li>
            <li><b>Wind Speed:</b> {weather.wind.speed} m/s {weather.wind.deg} degrees</li>
          </ul>
        </>
      }
    </div>
  )
}

export default CountryData