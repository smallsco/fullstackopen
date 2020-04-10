import React from 'react'

const CountryData = ({ country }) => (
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
  </div>
)

export default CountryData