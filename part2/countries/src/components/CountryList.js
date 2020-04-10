import React from 'react'
import CountryData from './CountryData'

const CountryList = ({countries, countryFilter, showCountry, onShowCountry}) => {
  const filteredCountries = countries.filter(
    country => country.name.toLowerCase().includes(countryFilter.toLowerCase())
  )

  return (
    <>
      { !showCountry && filteredCountries.length > 10 &&
        <p>Too many matches, please specify another filter.</p>
      }
      { !showCountry && filteredCountries.length > 1 && filteredCountries.length <= 10 &&
        <table>
          <tbody>
            { filteredCountries.map(country =>
              <tr key={country.name}>
                <td>{country.name}</td>
                <td><button onClick={() => onShowCountry(country)}>Show</button></td>
              </tr>
            )}
          </tbody>
        </table>
      }
      { showCountry &&
        <CountryData country={showCountry} />
      }
      { !showCountry && filteredCountries.length === 1 &&
        <CountryData country={filteredCountries[0]} />
      }
      { !showCountry && filteredCountries < 1 &&
        <p>No matches, please specify another filter.</p>
      }
    </>
  )
}

export default CountryList